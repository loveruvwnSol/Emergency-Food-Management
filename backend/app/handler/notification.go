package handler

import (
	"app/app/model"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/robfig/cron/v3"
	"gorm.io/gorm"
)

func ScheduleExpiringItemsCheck(db *gorm.DB) {
	c := cron.New()
	c.AddFunc("0 10 * *", func() {
		CheckExpiringItems(db)
	})
	// c.AddFunc("*/1 * * * *", func() {
	// 	log.Println("Checking expiring items...")
	// 	CheckExpiringItems(db)
	// })

	c.Start()
}

func CheckExpiringItems(db *gorm.DB) {
	now := time.Now()
	threeDaysLater := now.Add(72 * time.Hour)

	var items []model.Item

	result := db.Where("expiration <= ?", threeDaysLater).Find(&items)

	if result.Error != nil {
		log.Println("Failed to get items")
		return
	}

	if result.RowsAffected == 0 {
		log.Println("No items are nearing expiration at the moment")
		return
	}

	familyItems := make(map[int][]model.Item)

	for _, item := range items {
		familyID := item.FamilyID
		familyItems[familyID] = append(familyItems[familyID], item)
	}

	for familyID, items := range familyItems {
		log.Printf("ファミリーID: %d の期限切れ間近なアイテム: %v", familyID, items)
	}

	for familyID, items := range familyItems {
		itemIDs := make([]int, len(items))
		for i, item := range items {
			itemIDs[i] = item.ID
		}
		CreateNewNotification(db, "expiration", familyID, itemIDs)
	}
}

func CreateNewNotification(db *gorm.DB, Type string, familyID int, itemIDs []int) {
	itemIDsJSON, err := json.Marshal(itemIDs)
	if err != nil {
		log.Println("Failed to JSON conversion", err)
		return
	}

	newNotification := model.Notification{FamilyID: familyID,
		Type: Type, IsRead: false, ItemIDs: itemIDsJSON}

	switch newNotification.Type {
	case "expiration":
		newNotification.Text = "消費期限が切れそうなアイテムがあります。"
	case "lowStock":
		newNotification.Text = "備蓄量が不足しているアイテムがあります。"
	default:
		log.Println("Unsupported notification type")

		return
	}

	if err := db.Create(&newNotification).Error; err != nil {
		log.Println("Failed to create new notification", err)
		return
	}

	log.Println("Create new notification")
}

func GetNotifications(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		familyID, err := strconv.Atoi(ctx.Param("family_id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid family id"})
			return
		}

		var notificationSettings model.NotificationSettings

		if err := db.Where("user_id = ?", userID).First(&notificationSettings).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
			return
		}
		var notifications []model.Notification
		var expirationWarnings []model.Notification
		var lowStockWarnings []model.Notification

		if notificationSettings.IsExpirationWarning {
			expirationResult := db.Preload("Family").Where("family_id = ? AND type = ?", familyID, "expiration").Find(&expirationWarnings)
			if expirationResult.Error != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve expiration notifications"})
				return
			}
			notifications = append(notifications, expirationWarnings...)
		}

		if notificationSettings.IsLowStockWarning {
			lowStockResult := db.Preload("Family").Where("family_id = ? AND type = ?", familyID, "lowStock").Find(&lowStockWarnings)
			if lowStockResult.Error != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve low stock notifications"})
				return
			}
			notifications = append(notifications, lowStockWarnings...)
		}

		if len(notifications) == 0 {
			ctx.JSON(http.StatusOK, gin.H{"success": "No notifications found", "notifications": notifications})
			return
		}

		var items []model.Item

		for _, notification := range notifications {
			var itemIDs []int

			if err := json.Unmarshal(notification.ItemIDs, &itemIDs); err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode item IDs"})
				continue
			}

			log.Println(itemIDs)

			for _, itemID := range itemIDs {
				var item model.Item
				if err := db.Where("id = ?", itemID).First(&item).Error; err != nil {
					ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get item", "item_id": itemID})
					return
				}
				items = append(items, item)
			}
		}

		ctx.JSON(http.StatusOK, gin.H{
			"success": "Get notifications and items",
			"data": func() []interface{} {
				var result []interface{}

				for _, notification := range notifications {
					var itemIDs []int
					if err := json.Unmarshal(notification.ItemIDs, &itemIDs); err != nil {
						log.Println("Error decoding item_ids:", err)
						continue
					}

					var itemArray []interface{}
					addedItems := make(map[int]bool)

					for _, id := range itemIDs {
						for _, item := range items {
							if item.ID == id {
								if !addedItems[item.ID] {
									itemArray = append(itemArray, item)
									addedItems[item.ID] = true
								}
							}
						}
					}

					result = append(result, map[string]interface{}{
						"items":        itemArray,
						"notification": notification,
					})
				}
				return result
			}(),
		})
	}
}

func UpdateReadStatus(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		familyID, err := strconv.Atoi(ctx.Param("family_id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid family id"})
			return
		}

		if err := db.Model(&model.Notification{}).Where("family_id = ? AND is_read = false", familyID).Update("is_read", true).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update read status"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update read status"})
	}
}

func InitNotificationSettings(db *gorm.DB, userID int) error {
	notificationSettings := model.NotificationSettings{UserID: userID, IsExpirationWarning: true, IsLowStockWarning: true}

	res := db.Create(&notificationSettings)
	if res.Error != nil {
		return fmt.Errorf("failed to create notification settings: %v", res.Error)
	}

	if res.RowsAffected == 0 {
		return fmt.Errorf("no rows affected, notification settings creation failed")
	}

	return nil
}

func GetNotificationSettings(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		userID := ctx.MustGet("user_id").(int)

		var notificationSettings model.NotificationSettings

		result := db.Where("user_id = ?", userID).Preload("User").First(&notificationSettings)

		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Notification settings not found"})
				return
			}
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve notification settings"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"success": "Get notification successfully", "notification": notificationSettings,
		})
	}
}

func UpdateNotificationSettings(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		notificationSettings := model.NotificationSettings{UserID: userID}

		if err := ctx.Bind(&notificationSettings); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification settings"})
			return
		}

		result := db.Table("notification_settings").Where("user_id = ?", notificationSettings.UserID).Updates(map[string]interface{}{
			"is_expiration_warning": notificationSettings.IsExpirationWarning,
			"is_low_stock_warning":  notificationSettings.IsLowStockWarning,
		})

		if result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update notification settings"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found notification settings"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update notification settings"})
	}
}
