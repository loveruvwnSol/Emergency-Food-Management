package model

type User struct {
	Base
	Name     string `json:"name" gorm:"not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
	IconURL  string `json:"icon_url"`
}
