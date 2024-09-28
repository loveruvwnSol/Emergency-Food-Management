package model

import "time"

type Item struct {
	Base
	FamilyID   int       `json:"family_id"`
	Name       string    `json:"name" gorm:"not null"`
	Type       string    `json:"type" gorm:"not null"`
	Expiration time.Time `json:"expiration" gorm:"not null"`
	Stock      int       `json:"stock" gorm:"not null"`
	Family     Family    `gorm:"foreignKey:FamilyID"` // Familyとのリレーション
}
