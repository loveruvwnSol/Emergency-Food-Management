package model

type Stock struct {
	UserID int  `json:"user_id"`
	Food   int  `json:"food" gorm:"not null"`
	Drink  int  `json:"drink" gorm:"not null"`
	User   User `gorm:"foreignKey:UserID"` // Userとのリレーション
}
