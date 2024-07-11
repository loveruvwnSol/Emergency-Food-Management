package model

import "time"

type Base struct {
	ID        int `json:"id" gorm:"primarykey AUTO_INCREMENT"`
	CreatedAt time.Time
}
