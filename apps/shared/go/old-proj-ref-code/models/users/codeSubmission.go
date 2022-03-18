package users

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Submission represents a code submission
type Submission struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Code map[string]string
}
