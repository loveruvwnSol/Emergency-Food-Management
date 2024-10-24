package model

type User struct {
	Base
	Name     string `json:"name" gorm:"size:16;not null" binding:"required,max=16"`
	Email    string `json:"email" gorm:"unique;not null" binding:"required,email"`
	Password string `json:"password" gorm:"not null" binding:"required,min=8"`
	IconURL  string `json:"icon_url" binding:"omitempty,url"`
}
