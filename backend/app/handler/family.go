package handler

import (
	"app/app/model"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetFamilyMembers(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		currentUserID, err := strconv.Atoi(ctx.Param("id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
			return
		}

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

		familyRes := db.Create(&newFamily)

		if familyRes.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed create family"})
			return
		}

		newMember := model.Member{FamilyID: newFamily.ID, Role: "admin"}

		if err := ctx.Bind(&newMember); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid member"})
			return
		}

		memberRes := db.Create(&newMember)

		if memberRes.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed add member"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Create new family"})
	}
}

func JoinToFamily(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		newMember := model.Member{Role: "member"}

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

		if err := db.Where(&model.Invitation{InviteeID: newMember.UserID, FamilyID: newMember.FamilyID}).Delete(&model.Invitation{}).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete invitation"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Join to new family group"})
	}
}

func DeleteFamilyMember(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, err := strconv.Atoi(ctx.Param("id"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed delete member"})
			return
		}

		res := db.Where("user_id = ?", userID).Delete(&model.Member{})

		if res.Error != nil {
			ctx.JSON(http.StatusBadRequest, res.Error)
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Delete member"})
	}
}
