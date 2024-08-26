package handler

import (
	"app/app/model"
	"crypto/sha256"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type EmailLoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func CreateAccount(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newUser model.User

		if err := ctx.BindJSON(&newUser); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid"})
			return
		}

		newUser.Password = fmt.Sprintf("%x", sha256.Sum256([]byte(newUser.Password)))
		res := db.Table("users").Create(&newUser)
		if res.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to sign up"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"success": "Create new account"})
	}
}

func Login(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var requestUser EmailLoginRequest

		if err := ctx.BindJSON(&requestUser); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid"})
		}

		requestUser.Password = fmt.Sprintf("%x", sha256.Sum256([]byte(requestUser.Password)))

		var findUser model.User
		if err := db.Table("users").Where("email = ?", requestUser.Email).First(&findUser).Error; err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Can not found request user"})
			return
		}

		if requestUser.Email != findUser.Email || requestUser.Password != findUser.Password {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": findUser.ID,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte("EMERGENCY-FOOD-MANAGEMENT-TOKEN-KEY-007"))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to signing token"})
			return
		}

		ctx.Header("Authorization", tokenString)
		ctx.JSON(http.StatusOK, tokenString)
	}

}

func IsLoggedInUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		tokenStr := strings.TrimPrefix(ctx.GetHeader("Authorization"), "Bearer ")

		claims, err := ParseJWT(tokenStr)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			ctx.Abort()
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": "Logged in user now", "claims": claims})

	}
}

func ParseJWT(tokenStr string) (*model.Claims, error) {
	claims := &model.Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("EMERGENCY-FOOD-MANAGEMENT-TOKEN-KEY-007"), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return claims, nil
}
