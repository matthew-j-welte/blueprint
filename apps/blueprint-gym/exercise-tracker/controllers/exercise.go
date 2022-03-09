package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /books
// Get all books
func FindBooks(c *gin.Context) {
  c.JSON(http.StatusOK, gin.H{"data": nil})
}