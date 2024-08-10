package middleware

import (
	"app/app/handler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		var tokenStr string

		if err := c.BindJSON(&tokenStr); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
			return
		}

		claims, err := handler.ParseJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "success"})
		c.Set("user_id", claims.UserId)
		c.Next()

	}
}
