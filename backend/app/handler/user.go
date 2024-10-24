package handler

import (
	"app/app/model"
	"app/app/validations"
	"net/http"
	"strings"

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
			"icon_url":  user.IconURL,
		})
	}
}

func IndependentUsers(db *gorm.DB) ([]model.User, error) {
	var independentUsers []model.User

	if err := db.Table("users").
		Where("id NOT IN (?)", db.Table("members").Select("user_id")).
		Find(&independentUsers).Error; err != nil {
		return nil, err
	}

	return independentUsers, nil
}

func GetAllIndependentUsers(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		independentUsers, err := IndependentUsers(db)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed get independent users"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Get all independent users", "independentUsers": independentUsers})
	}
}

func SearchIndependentUsers(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		query := ctx.Query("q")
		var filteredUsers []model.User

		independentUsers, err := IndependentUsers(db)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		if query == "" {
			filteredUsers = independentUsers
		} else {
			lowerQuery := strings.ToLower(query)

			for _, user := range independentUsers {
				if strings.Contains(strings.ToLower(user.Name), lowerQuery) {
					filteredUsers = append(filteredUsers, user)
				}
			}
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Search users", "filteredUsers": filteredUsers})

	}
}

type UpdateUsernameRequest struct {
	ID   int    `json:"id"  binding:"required"`
	Name string `json:"name" binding:"required,max=16"`
}

func UpdateUsername(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		user := UpdateUsernameRequest{ID: userID}

		if err := ctx.Bind(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": validations.UpdateUsernameError(err)})
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

func UpdateUserIconURL(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		var request struct {
			IconURL string `json:"icon_url" binding:"required,url"`
		}

		if err := ctx.Bind(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": validations.UpdateUserIconError(err)})
			return
		}

		result := db.Table("users").Where("id = ?", userID).Update("icon_url", request.IconURL)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Cannot update user icon"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "User icon updated", "icon_url": request.IconURL})
	}
}
