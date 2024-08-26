package model

type Invitation struct {
	Base
	InviterID int    `json:"inviter_id"`
	InviteeID int    `json:"invitee_id"`
	FamilyID  int    `json:"family_id"`
	Inviter   User   `gorm:"foreignKey:InviterID"` // Userとのリレーション
	Family    Family `gorm:"foreignKey:FamilyID"`  // Familyとのリレーション
}
