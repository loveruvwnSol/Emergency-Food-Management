package handler

import (
	"app/app/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCurrentUser(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		var user model.User
		if err := db.Table("users").Where("id = ?", userID).First(&user).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"id":        user.ID,
			"createdAt": user.CreatedAt,
			"name":      user.Name,
			"email":     user.Email,
		})
	}
}
