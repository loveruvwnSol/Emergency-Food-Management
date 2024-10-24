package model

import "time"

type Item struct {
	Base
	FamilyID   int       `json:"family_id" binding:"required"`
	Name       string    `json:"name" gorm:"not null" binding:"required,max=16"`
	Type       string    `json:"type" gorm:"not null" binding:"required"`
	Expiration time.Time `json:"expiration" gorm:"not null" binding:"required"`
	Stock      int       `json:"stock" gorm:"not null" binding:"required"`
	ImageURL   string    `json:"image_url" binding:"required,url"`
	Family     Family    `gorm:"foreignKey:FamilyID"`
}
