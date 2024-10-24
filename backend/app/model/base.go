package model

import "time"

type Base struct {
	ID        int `json:"id" gorm:"primaryKey AUTO_INCREMENT"`
	CreatedAt time.Time
}
