package reports

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ErrorReport used to contain error reports to be submitted
type ErrorReport struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID  string             `json:"userID,omitempty"`
	Error   string             `json:"err,omitempty"`
	Type    string             `json:"type,omitempty"`
	Payload map[string]interface{}
}
