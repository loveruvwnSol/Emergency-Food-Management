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

	r.POST("/signup", handler.SignUp(db))
	r.POST("/signin", handler.SignIn(db))

	r.Run(":8080")
}
