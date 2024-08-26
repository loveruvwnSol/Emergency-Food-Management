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
	r.GET("/isLoggedInUser", handler.IsLoggedInUser())

	r.GET("/user", middleware.AuthMiddleWare(), handler.GetCurrentUser(db))
	r.GET("/user:id/family", handler.GetFamilyMembers(db))
	r.POST("/user/family", handler.CreateNewFamily(db))
	r.DELETE("/user:id/family", handler.DeleteFamilyMember(db))

	r.GET("/invitations:id", handler.GetInvitations(db))
	r.POST("/invitations/invite", handler.InviteUserForFamily(db))
	r.POST("/invitations/accept", handler.JoinToFamily(db))

	r.Run(":8080")
}
