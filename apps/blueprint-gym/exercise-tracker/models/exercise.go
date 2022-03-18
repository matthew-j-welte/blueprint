package models

import (
	"../constants"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AllExercises struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ExerciseRefs []ExerciseRef
}

type Exercise struct {
	ID                      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ExerciseName            string
	Description             string
	MusclesWorked           []string
	Labels                  []string
	State                   constants.ExerciseState
	Difficulty              constants.FitnessDifficulty
	Author                  MemberLink
	ParentVariationExercise ExerciseLink
}

type ExerciseRef struct {
	ExerciseId         string
	ExerciseName       string
	DescriptionSnippet string
	MusclesWorked      []string
	State              constants.ExerciseState
	Difficulty         constants.FitnessDifficulty
}
