package handler

import (
	"app/app/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FetchInvitations(db *gorm.DB, userID int) ([]model.Invitation, error) {
	var invitations []model.Invitation

	result := db.Preload("Inviter").Preload("Family").Where("invitee_id = ?", userID).Find(&invitations)

	if result.Error != nil {
		return nil, result.Error
	}

	return invitations, nil

}

func GetInvitations(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		currentUserID := ctx.MustGet("user_id").(int)

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
		userID := ctx.MustGet("user_id").(int)
		newInvitation := model.Invitation{InviterID: userID}

		if err := ctx.Bind(&newInvitation); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid invitation"})
			return
		}

		if err := db.Where("inviter_id = ? AND invitee_id = ?", userID, newInvitation.InviteeID).First(&model.Invitation{}).Error; err == nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Already invite the user"})
			return
		}

		if err := db.Create(&newInvitation).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to invitation"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Invite User"})
	}
}
