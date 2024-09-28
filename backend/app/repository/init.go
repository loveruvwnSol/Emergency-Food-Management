package repository

import (
	"app/app/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func DBInit() *gorm.DB {
	dsn := "docker:docker@tcp(database)/main?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect db")
	}

	if err := db.AutoMigrate(&model.User{}); err != nil {
		panic("failed migrate users")
	}

	if err := db.AutoMigrate(&model.Family{}); err != nil {
		panic("failed migrate families")
	}

	if err := db.AutoMigrate(&model.Member{}); err != nil {
		panic("failed migrate members")
	}

	if err := db.AutoMigrate(&model.Invitation{}); err != nil {
		panic("failed migrate invitations")
	}

	if err := db.AutoMigrate(&model.Item{}); err != nil {
		panic("failed migrate items")
	}

	if err := db.AutoMigrate(&model.Stock{}); err != nil {
		panic("failed migrate stocks")
	}
	if err := db.AutoMigrate(&model.Notification{}); err != nil {
		panic("failed migrate notifications")
	}
	if err := db.AutoMigrate(&model.NotificationSettings{}); err != nil {
		panic("failed migrate notification settings")
	}
	return db
}
