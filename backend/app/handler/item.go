package handler

import (
	"app/app/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FetchItems(db *gorm.DB, familyID int) ([]model.Item, error) {
	var items []model.Item

	result := db.Preload("Family").Where("family_id = ?", familyID).Find(&items)

	if result.Error != nil {
		return nil, result.Error
	}

	return items, nil
}

func GetItems(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var items []model.Item

		familyID, err := strconv.Atoi(ctx.Param("family_id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid familyId"})
			return
		}

		if err := db.Table("items").Where("family_id = ?", familyID).Preload("Family").Find(&items).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get items"})
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

func AddNewItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		var newItem model.Item

		if err := ctx.Bind(&newItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid newItem"})
			return
		}

		if err := db.Table("items").Create(&newItem).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add newItem"})
			return
		}

		fetchedItems, err := FetchItems(db, newItem.FamilyID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetch items: "})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Item added successfully", "items": fetchedItems})
	}
}

func UpdateItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		itemID, err := strconv.Atoi(ctx.Param("item_id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}

		updateItem := model.Item{Base: model.Base{ID: itemID}}

		if err := ctx.Bind(&updateItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item"})
			return
		}

		result := db.Table("items").Where("id = ?", updateItem.ID).Updates(updateItem)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update item"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found update item"})
			return
		}

		fetchedItems, err := FetchItems(db, updateItem.FamilyID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching items"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Update item", "items": fetchedItems})
	}
}

func DeleteItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		itemID := ctx.Param("item_id")
		var item model.Item

		if err := db.Table("items").Where("id = ?", itemID).First(&item).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
			return
		}

		result := db.Table("items").Where("id = ?", itemID).Delete(&model.Item{})

		if result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete item"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
			return
		}

		fetchedItems, err := FetchItems(db, item.FamilyID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching items: "})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Item deleted successfully", "items": fetchedItems})
	}
}
