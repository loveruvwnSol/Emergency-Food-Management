package model

type Invitation struct {
	Base
	InviterID int    `json:"inviter_id" gorm:"not null"`
	InviteeID int    `json:"invitee_id" gorm:"not null"`
	FamilyID  int    `json:"family_id" gorm:"not null"`
	Inviter   User   `gorm:"foreignKey:InviterID"`
	Family    Family `gorm:"foreignKey:FamilyID"`
}
