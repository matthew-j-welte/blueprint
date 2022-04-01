package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Regimen struct {
	ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	MemberId           string
	RegimenId          string
	RegimenName        string
	RegimenDescription string
	Difficulty         FitnessDifficulty
	StartDate          primitive.DateTime
	EndDate            primitive.DateTime
	Workouts           []WorkoutLink
	MuscleSpecificity  MuscleSpecificity
}
