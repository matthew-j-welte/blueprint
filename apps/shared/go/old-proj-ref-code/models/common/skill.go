package common

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Skill represents a user comment
type Skill struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string
	Icon string
	Type string
}
