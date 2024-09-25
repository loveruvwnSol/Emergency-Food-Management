package model

type Notification struct {
	UserID   int  `json:"user_id"`
	Deadline bool `json:"deadline" gorm:"not null"`
	Amount   bool `json:"amount" gorm:"not null"`
	User     User `gorm:"foreignKey:UserID"`
}
