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

	handler.ScheduleExpiringItemsCheck(db)

	r.POST("/createAccount", handler.CreateAccount(db))
	r.POST("/login", handler.Login(db))
	r.GET("/isLoggedInUser", handler.IsLoggedInUser())

	r.GET("/user", middleware.AuthMiddleWare(), handler.GetCurrentUser(db))
	r.PUT("/user", middleware.AuthMiddleWare(), handler.UpdateUsername(db))
	r.PUT("/user/icon", middleware.AuthMiddleWare(), handler.UpdateIconURL(db))
	r.GET("/user:id/family", middleware.AuthMiddleWare(), handler.GetFamilyMembers(db))
	r.POST("/user/family", middleware.AuthMiddleWare(), handler.CreateNewFamily(db))
	r.DELETE("/user:id/family", handler.DeleteFamilyMember(db))

	r.GET("/users", handler.GetAllIndependentUsers(db))
	r.GET("/users/search", handler.SearchIndependentUsers(db))

	r.GET("/invitations", middleware.AuthMiddleWare(), handler.GetInvitations(db))
	r.POST("/invitations/invite", middleware.AuthMiddleWare(), handler.InviteUserForFamily(db))
	r.POST("/invitations/accept", middleware.AuthMiddleWare(), handler.JoinToFamily(db))

	r.GET("/items/:family_id", handler.GetItems(db))
	r.GET("/items/search", handler.SearchItems(db))
	r.POST("/item", handler.AddNewItem(db))
	r.PUT("/item/:item_id", handler.UpdateItem(db))

	r.DELETE("/item/:family_id/:item_id", handler.DeleteItem(db))

	r.GET("/stocks", middleware.AuthMiddleWare(), handler.GetStocks(db))
	r.PUT("/stock", middleware.AuthMiddleWare(), handler.UpdateStock(db))

	r.GET("/notifications/:family_id", middleware.AuthMiddleWare(), handler.GetNotifications(db))
	r.GET("/notifications/settings", middleware.AuthMiddleWare(), handler.GetNotificationSettings(db))
	r.PUT("/notifications/settings", middleware.AuthMiddleWare(), handler.UpdateNotificationSettings(db))

	r.Run(":8080")
}
