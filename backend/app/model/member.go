package model

type Member struct {
	Base
	FamilyID int    `json:"family_id"`
	UserID   int    `json:"user_id"`
	Role     string `json:"role"`
	User     User   `gorm:"foreignKey:UserID"`   // Userとのリレーション
	Family   Family `gorm:"foreignKey:FamilyID"` // Familyとのリレーション
}
