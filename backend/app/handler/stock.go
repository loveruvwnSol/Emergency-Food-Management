package handler

import (
	"app/app/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitStock(db *gorm.DB, userID int) error {
	// 新しいストックを初期化
	stock := model.Stock{UserID: userID, Food: 3, Drink: 3}

	// ストックをデータベースに作成
	res := db.Table("stocks").Create(&stock)
	if res.Error != nil {
		// エラーが発生した場合、詳細なエラーメッセージを返す
		return fmt.Errorf("failed to create stock: %v", res.Error)
	}

	if res.RowsAffected == 0 {
		// データが作成されなかった場合のエラー処理
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
