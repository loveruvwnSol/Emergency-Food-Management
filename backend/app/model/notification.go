package model

type Notification struct {
	UserID              int  `json:"user_id"`
	IsExpirationWarning bool `json:"is_expiration_warning" gorm:"not null"`
	IsLowStockWarning   bool `json:"is_low_stock_warning" gorm:"not null"`
	User                User `gorm:"foreignKey:UserID"`
}
