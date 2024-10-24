package handler

import (
	"app/app/model"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitStock(db *gorm.DB, userID int) error {
	stock := model.Stock{UserID: userID, Food: 3, Drink: 3}

	res := db.Table("stocks").Create(&stock)
	if res.Error != nil {
		return fmt.Errorf("failed to create stock: %v", res.Error)
	}

	if res.RowsAffected == 0 {
		return fmt.Errorf("no rows affected, stock creation failed")
	}

	return nil
}

func GetStocks(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		userID := ctx.MustGet("user_id").(int)

		var stock model.Stock

		result := db.Table("stocks").Where("user_id = ?", userID).Preload("User").First(&stock)

		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Stock not found"})
				return
			}
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve stock"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"success": "Get stock successfully", "stock": stock,
		})
	}
}

func UpdateStock(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		stock := model.Stock{UserID: userID}

		if err := ctx.Bind(&stock); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid stock"})
			return
		}

		result := db.Table("stocks").Where("user_id = ?", stock.UserID).Updates(map[string]interface{}{
			"food":  stock.Food,
			"drink": stock.Drink,
		})

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Cannot update user's stock"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found user' stock"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update user's stock"})
	}
}

func GetFamilyStocks(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		familyID, err := strconv.Atoi(ctx.Param("family_id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid family"})
			return
		}

		var members []model.Member
		if err := db.Preload("User").Preload("Family").Where("family_id = ?", familyID).Find(&members).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get family members"})
			return
		}

		var stocks []model.Stock
		for _, member := range members {
			var stock model.Stock
			if err := db.Preload("User").Where("user_id = ?", member.UserID).Find(&stock).Error; err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user stocks setting"})
				return
			}
			stocks = append(stocks, stock)
		}

		var familyFoodStocks model.FamilyStocks
		var familyDrinkStocks model.FamilyStocks

		for _, stock := range stocks {
			familyFoodStocks.Goal += stock.Food
			familyDrinkStocks.Goal += stock.Drink
		}

		var items []model.Item
		if err := db.Table("items").Where("family_id = ?", familyID).Preload("Family").Find(&items).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get items"})
			return
		}

		now := time.Now()
		threeDaysLater := now.Add(72 * time.Hour)

		for _, item := range items {
			if item.Type == "food" {
				if item.Expiration.Before(threeDaysLater) {
					familyFoodStocks.NearExpiryCount += item.Stock
				} else {
					familyFoodStocks.LongShelfLifeCount += item.Stock
				}
				familyFoodStocks.Current += item.Stock
			} else {
				if item.Expiration.Before(threeDaysLater) {
					familyDrinkStocks.NearExpiryCount += item.Stock
				} else {
					familyDrinkStocks.LongShelfLifeCount += item.Stock
				}
				familyDrinkStocks.Current += item.Stock
			}

		}

		ctx.JSON(http.StatusOK, gin.H{"familyFoodStocks": familyFoodStocks, "familyDrinkStocks": familyDrinkStocks})
	}
}
