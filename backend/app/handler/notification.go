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
	notification := model.Notification{UserID: userID, Deadline: true, Amount: true}

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

func UpdateNotification(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		notification := model.Notification{UserID: userID}

		if err := ctx.Bind(&notification); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification"})
			return
		}

		result := db.Table("notifications").Where("user_id = ?", notification.UserID).Updates(map[string]interface{}{
			"deadline": notification.Deadline,
			"amount":   notification.Amount,
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
