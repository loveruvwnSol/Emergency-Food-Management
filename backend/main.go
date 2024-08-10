package main

import (
	"app/app/handler"
	"app/app/repository"
	"app/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(middleware.CORSMiddleware())
	db := repository.DBInit()

	r.POST("/createAccount", handler.CreateAccount(db))
	r.POST("/login", handler.Login(db))

	r.POST("/isLoggedInUser", middleware.AuthMiddleWare())

	r.Run(":8080")
}
