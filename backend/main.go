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
	r.PUT("/user", middleware.AuthMiddleWare(), handler.UpdateUsername(db))
	r.GET("/user:id/family", middleware.AuthMiddleWare(), handler.GetFamilyMembers(db))
	r.POST("/user/family", middleware.AuthMiddleWare(), handler.CreateNewFamily(db))
	r.DELETE("/user:id/family", handler.DeleteFamilyMember(db))

	r.GET("/users", handler.GetAllIndependentUsers(db))
	r.GET("/users/search", handler.SearchIndependentUsers(db))

	r.GET("/invitations", middleware.AuthMiddleWare(), handler.GetInvitations(db))
	r.POST("/invitations/invite", middleware.AuthMiddleWare(), handler.InviteUserForFamily(db))
	r.POST("/invitations/accept", middleware.AuthMiddleWare(), handler.JoinToFamily(db))

	r.PUT("/stock", middleware.AuthMiddleWare(), handler.UpdateStock(db))

	r.PUT("/notification", middleware.AuthMiddleWare(), handler.UpdateNotification(db))

	r.Run(":8080")
}
