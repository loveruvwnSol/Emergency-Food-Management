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

type UpdateUsernameRequest struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func UpdateUsername(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		user := UpdateUsernameRequest{ID: userID}

		if err := ctx.Bind(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user"})
			return
		}

		result := db.Table("users").Where("id = ?", user.ID).Update("name", user.Name)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Cannot update user"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found user"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update username"})
	}
}
