package handler

import (
	"app/app/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FetchItem(db *gorm.DB, id int) (*model.Item, error) {
	var item model.Item

	result := db.Preload("Family").First(&item, id)

	if result.Error != nil {
		return nil, result.Error
	}

	return &item, nil
}

func GetItems(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var items []model.Item

		family_id, err := strconv.Atoi(ctx.Param("familyId"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid familyId"})
			return
		}

		if err := db.Table("items").Where("family_id = ?", family_id).Preload("Family").Find(&items).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch items"})
			return
		}

		if len(items) == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "No items found for the specified familyId"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"success": "Get items successfully",
			"items":   items,
		})
	}
}

func AddItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		var newItem model.Item

		if err := ctx.Bind(&newItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid newItem"})
			return
		}

		if err := db.Table("items").Create(&newItem).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot add newItem"})
			return
		}

		fetchedItem, err := FetchItem(db, newItem.ID)
		if err != nil {

			return
		}

		ctx.JSON(http.StatusOK, gin.H{"message": "Item added successfully", "newItem": fetchedItem})
	}
}

func UpdateItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var updateItem model.Item

		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}
		updateItem.ID = id

		if err := ctx.Bind(&updateItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid updateItem"})
			return
		}

		result := db.Table("items").Where("id = ?", updateItem.ID).Updates(updateItem)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Cannot update item"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not fount updateItem"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update item"})
	}
}

func DeleteItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		id := ctx.Param("id")

		result := db.Table("items").Where("id = ?", id).Delete(&model.Item{})

		if result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot delete item"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"message": "Item deleted successfully"})
	}
}
