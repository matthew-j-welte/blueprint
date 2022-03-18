package common

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Comment represents a user comment
type Comment struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID     string             `json:"userId"`
	Author     string
	DatePosted int `json:"datePosted"`
	Content    string
}
