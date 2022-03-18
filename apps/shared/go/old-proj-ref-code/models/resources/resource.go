package resources

import (
	"github.com/matthew-j-welte/bit-board/server/models/common"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Resource a learning resource
type Resource struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title       string
	Author      string
	Description string
	Viewers     int
	Posts       []ResourcePost
	Skills      []common.Skill
	Placeholder string
	VideoID     string `json:"videoId"`
	Image       string
	Type        string
}

// ResourceSuggestion a suggestion for a new learning resource to be published
type ResourceSuggestion struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Poster      primitive.ObjectID `json:"poster,omitempty" bson:"poster,omitempty"`
	URL         string             `json:"url"`
	Description string
	Rationale   string
	Category    string
}
