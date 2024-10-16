package handler

import (
	"app/app/model"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FetchFamily(db *gorm.DB, familyID int) ([]model.Member, error) {
	var members []model.Member

	result := db.Preload("User").Preload("Family").Where("family_id = ?", familyID).Find(&members)

	if result.Error != nil {
		return nil, result.Error
	}

	return members, nil
}

func GetFamilyMembers(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		currentUserID := ctx.MustGet("user_id").(int)

		var member model.Member

		if err := db.Where("user_id = ?", currentUserID).First(&member).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				ctx.JSON(http.StatusOK, gin.H{"success": "User is not part of any family", "members": []model.Member{}})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error finding user's family"})
			}
			return
		}

		var members []model.Member

		if err := db.Preload("User").Preload("Family").Where("family_id = ?", member.FamilyID).Find(&members).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve family members"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Get user's family members", "members": members})
	}
}

func CreateNewFamily(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newFamily model.Family
		userID := ctx.MustGet("user_id").(int)

		familyRes := db.Create(&newFamily)

		if familyRes.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed create family"})
			return
		}

		newMember := model.Member{UserID: userID, FamilyID: newFamily.ID, Role: "admin"}

		memberRes := db.Create(&newMember)

		if memberRes.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed add member"})
			return
		}

		members, err := FetchFamily(db, userID)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed fetch family members"})
			return
		}

		if err := db.Where(&model.Invitation{InviteeID: newMember.UserID}).Delete(&model.Invitation{}).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete invitation"})
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{"success": "Create new family", "members": members})
	}
}

func JoinToFamily(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.MustGet("user_id").(int)
		newMember := model.Member{UserID: userID, Role: "member"}

		if err := ctx.Bind(&newMember); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid member"})
			return
		}

		var invitation model.Invitation

		if err := db.Where(&model.Invitation{InviteeID: newMember.UserID, FamilyID: newMember.FamilyID}).First(&invitation).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invitation not found"})
			return
		}

		if err := db.Create(&newMember).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to join family group"})
			return
		}

		if err := db.Where(&model.Invitation{InviteeID: newMember.UserID}).Delete(&model.Invitation{}).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete invitation"})
			return
		}

		invitations, err := FetchInvitations(db, userID)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed fetch invitations"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Join to new family group", "invitations": invitations})
	}
}

func DeleteFamilyMember(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, err := strconv.Atoi(ctx.Param("id"))
		familyID, err := strconv.Atoi(ctx.Param("family_id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed delete member"})
			return
		}

		res := db.Where("user_id = ? AND family_id = ?", userID, familyID).Delete(&model.Member{})

		if res.Error != nil {
			ctx.JSON(http.StatusBadRequest, res.Error)
			return
		}

		members, err := FetchFamily(db, familyID)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed fetch family members"})
			return
		}

		fmt.Print(members)

		ctx.JSON(http.StatusOK, gin.H{"success": "Delete member", "members": members})
	}
}
