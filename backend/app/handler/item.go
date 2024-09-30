package handler

import (
	"app/app/model"
	"net/http"
	"strconv"
	"strings"
	"time"

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

type NewItemRequest struct {
	model.Base
	FamilyID   int    `json:"family_id"`
	Name       string `json:"name"`
	Type       string `json:"type"`
	Expiration string `json:"expiration"`
	Stock      int    `json:"stock"`
	ImageURL   string `json:"image_url"`
}

func AddNewItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		var requestItem NewItemRequest

		if err := ctx.ShouldBindJSON(&requestItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid newItem"})
			return
		}

		date, err := time.Parse("2006-01-02", requestItem.Expiration)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse date"})
			return
		}

		newItem := model.Item{
			FamilyID:   requestItem.FamilyID,
			Name:       requestItem.Name,
			Type:       requestItem.Type,
			Expiration: date,
			Stock:      requestItem.Stock,
			ImageURL:   requestItem.ImageURL,
		}

		if err := db.Table("items").Create(&newItem).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add newItem"})
			return
		}

		fetchedItems, err := FetchItems(db, newItem.FamilyID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetch items "})
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{"success": "Item added successfully", "items": fetchedItems})
	}
}

func UpdateItem(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		itemID, err := strconv.Atoi(ctx.Param("item_id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}

		var requestItem NewItemRequest

		if err := ctx.ShouldBindJSON(&requestItem); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item"})
			return
		}

		date, err := time.Parse("2006-01-02", requestItem.Expiration)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse date"})
			return
		}

		updateItem := model.Item{
			Base:       model.Base{ID: itemID},
			FamilyID:   requestItem.FamilyID,
			Name:       requestItem.Name,
			Type:       requestItem.Type,
			Expiration: date,
			Stock:      requestItem.Stock,
			ImageURL:   requestItem.ImageURL,
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

		result := db.Table("items").Where("id = ?", itemID).Delete(&model.Item{})

		if result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete item"})
			return
		}

		if result.RowsAffected == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
			return
		}

		familyID, err := strconv.Atoi(ctx.Param("family_id"))
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid family ID"})
			return
		}

		fetchedItems, err := FetchItems(db, familyID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching items "})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Item deleted successfully", "items": fetchedItems})
	}
}

func SearchItems(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		query := ctx.Query("q")
		familyID := ctx.Query("familyID")
		var items []model.Item

		if err := db.Where("family_id = ?", familyID).Find(&items).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query"})
			return
		}

		var filteredItems []model.Item

		if query == "" {
			filteredItems = items
		} else {
			lowerQuery := strings.ToLower(query)

			for _, item := range items {
				if strings.Contains(strings.ToLower(item.Name), lowerQuery) {
					filteredItems = append(filteredItems, item)
				}
			}
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Search items", "filteredItems": filteredItems})
	}
}
