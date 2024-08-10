package handler

import (
	"app/app/model"
	"crypto/sha256"
	"fmt"
	"net/http"
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
	return func(c *gin.Context) {
		var newUser model.User

		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid"})
			return
		}

		newUser.Password = fmt.Sprintf("%x", sha256.Sum256([]byte(newUser.Password)))
		res := db.Table("users").Create(&newUser)
		if res.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed sign up"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	}
}

func Login(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var requestUser EmailLoginRequest

		if err := c.BindJSON(&requestUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid"})
		}

		requestUser.Password = fmt.Sprintf("%x", sha256.Sum256([]byte(requestUser.Password)))

		var findUser model.User
		if err := db.Table("users").Where("email = ?", requestUser.Email).First(&findUser).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Can not found request user"})
			return
		}

		if requestUser.Email != findUser.Email || requestUser.Password != findUser.Password {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": findUser.ID,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte("EMERGENCY-FOOD-MANAGEMENT-TOKEN-KEY-007"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error signing token"})
			return
		}

		c.Header("Authorization", tokenString)
		c.JSON(http.StatusOK, tokenString)
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
