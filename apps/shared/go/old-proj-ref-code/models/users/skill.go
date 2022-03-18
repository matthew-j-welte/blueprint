package users

import (
	"github.com/matthew-j-welte/bit-board/server/models/common"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UserSkill a skill for a certain user
type UserSkill struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Skill    common.Skill
	Level    int
	Percent  int
	Name     string
	Category string
}
