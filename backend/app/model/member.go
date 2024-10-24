package model

type Member struct {
	Base
	FamilyID int    `json:"family_id" gorm:"not null" binding:"required"`
	UserID   int    `json:"user_id" gorm:"not null" binding:"required"`
	Role     string `json:"role" gorm:"not null"`
	User     User   `gorm:"foreignKey:UserID"`
	Family   Family `gorm:"foreignKey:FamilyID"`
}
