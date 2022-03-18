package resources

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ResourcePost a user submitted post associated with a resource
type ResourcePost struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID       primitive.ObjectID `json:"userID,omitempty" bson:"userID,omitempty"`
	Content      string
	FullName     string
	ProfileImage string
	Likes        int
	Reports      int
	Posted       int64
}
