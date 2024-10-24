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

	r.POST("/account", handler.CreateAccount(db))
	r.POST("/login", handler.Login(db))
	r.GET("/session", handler.IsLoggedInUser())

	r.GET("/users", middleware.AuthMiddleWare(), handler.GetCurrentUser(db))
	r.PUT("/users/:id", middleware.AuthMiddleWare(), handler.UpdateUsername(db))
	r.PUT("/users/:id/icon", middleware.AuthMiddleWare(), handler.UpdateUserIconURL(db))
	r.GET("/users/search", handler.SearchIndependentUsers(db))
	r.GET("/users/independent", handler.GetAllIndependentUsers(db))

	r.GET("/users/:id/family", middleware.AuthMiddleWare(), handler.GetFamilyMembers(db))
	r.GET("/families/:family_id/stocks", handler.GetFamilyStocks(db))
	r.POST("/families", middleware.AuthMiddleWare(), handler.CreateNewFamily(db))
	r.DELETE("/families/:family_id/members/:id", handler.DeleteFamilyMember(db))

	r.GET("/users/:id/invitations", middleware.AuthMiddleWare(), handler.GetInvitations(db))
	r.POST("/invitations", middleware.AuthMiddleWare(), handler.InviteUserForFamily(db))
	r.POST("/invitations/accept", middleware.AuthMiddleWare(), handler.JoinToFamily(db))

	r.GET("families/:family_id/items", handler.GetItems(db))
	r.GET("/families/:family_id/items/search", handler.SearchItems(db))
	r.POST("/families/items", handler.AddNewItem(db))
	r.PUT("/items/:item_id", handler.UpdateItem(db))
	r.DELETE("/families/:family_id/items/:item_id", handler.DeleteItem(db))

	r.GET("/users/:id/stocks", middleware.AuthMiddleWare(), handler.GetStocks(db))
	r.PUT("/users/:id/stocks", middleware.AuthMiddleWare(), handler.UpdateStock(db))

	r.GET("/families/:family_id/notifications", middleware.AuthMiddleWare(), handler.GetNotifications(db))
	r.PUT("/families/:family_id/notifications", handler.UpdateReadStatus(db))

	r.GET("/users/:id/notifications/settings", middleware.AuthMiddleWare(), handler.GetNotificationSettings(db))
	r.PUT("/users/:id/notifications/settings", middleware.AuthMiddleWare(), handler.UpdateNotificationSettings(db))

	r.Run(":8080")
}
