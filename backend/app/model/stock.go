package model

type Stock struct {
	UserID int  `json:"user_id" gorm:"not null" binding:"required"`
	Food   int  `json:"food" gorm:"not null" binding:"required,gte=1"`
	Drink  int  `json:"drink" gorm:"not null" binding:"required,gte=1"`
	User   User `gorm:"foreignKey:UserID"`
}

type FamilyStocks struct {
	Goal               int `json:"goal"`
	Current            int `json:"current"`
	LongShelfLifeCount int `json:"longShelfLifeCount"`
	NearExpiryCount    int `json:"nearExpiryCount"`
}
