package handler

import (
	"app/app/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetInvitations(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		currentUserID, err := strconv.Atoi(ctx.Param("id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
			return
		}

		var invitations []model.Invitation

		if err := db.Preload("Inviter").Preload("Family").Where("invitee_id = ?", currentUserID).Find(&invitations).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Error fetching invitations"})
			return
		}

		if len(invitations) == 0 {
			ctx.JSON(http.StatusOK, gin.H{"success": "No invitations found", "invitations": invitations})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Get invitations", "invitations": invitations})
	}
}

func InviteUserForFamily(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newInvitation model.Invitation

		if err := ctx.Bind(&newInvitation); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid invitation"})
			return
		}

		if err := db.Create(&newInvitation).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to invitation"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Invite User"})
	}
}
