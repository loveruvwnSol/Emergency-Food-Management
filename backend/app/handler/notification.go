package handler

import (
	"app/app/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitNotification(db *gorm.DB, userID int) error {
	// 新しいストックを初期化
	notification := model.Notification{UserID: userID, IsExpirationWarning: true, IsLowStockWarning: true}

	// ストックをデータベースに作成
	res := db.Table("notifications").Create(&notification)
	if res.Error != nil {
		// エラーが発生した場合、詳細なエラーメッセージを返す
		return fmt.Errorf("failed to create notification: %v", res.Error)
	}

	if res.RowsAffected == 0 {
		// データが作成されなかった場合のエラー処理
		return fmt.Errorf("no rows affected, notification creation failed")
	}

	return nil
}

func GetNotifications(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		userID := ctx.MustGet("user_id").(int)

		var notification model.Notification

		result := db.Table("notifications").Where("user_id = ?", userID).Preload("User").First(&notification)

		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Notification not found"})
				return
			}
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve notification"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"success": "get notification successfully", "notification": notification,
		})
	}
}

func UpdateNotification(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		notification := model.Notification{UserID: userID}

		if err := ctx.Bind(&notification); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification"})
			return
		}

		result := db.Table("notifications").Where("user_id = ?", notification.UserID).Updates(map[string]interface{}{
			"is_expiration_warning": notification.IsExpirationWarning,
			"is_low_stock_warning":  notification.IsLowStockWarning,
		})

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Cannot update notification"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found notification"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update notification"})
	}
}
