package model

import "encoding/json"

type Notification struct {
	Base
	FamilyID int             `json:"family_id"`
	Text     string          `json:"text"`
	Type     string          `json:"type" gorm:"not null"`
	IsRead   bool            `json:"is_read"`
	Family   Family          `gorm:"foreignKey:FamilyID"`
	ItemIDs  json.RawMessage `json:"item_ids"  gorm:"type:json"`
}

type NotificationSettings struct {
	UserID              int  `json:"user_id"`
	IsExpirationWarning bool `json:"is_expiration_warning" gorm:"not null"`
	IsLowStockWarning   bool `json:"is_low_stock_warning" gorm:"not null"`
	User                User `gorm:"foreignKey:UserID"`
}
