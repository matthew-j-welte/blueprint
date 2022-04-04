package services

import (
	"github.com/matthew-j-welte/blueprint/apps/blueprint-gym/fitness-tracker/models"
)

type ExerciseFormView struct {
	ID                      string
	ExerciseName            string
	Description             string
	MusclesWorked           []string
	Labels                  []string
	State                   models.ExerciseState
	Difficulty              models.FitnessDifficulty
	ParentVariationExercise models.ExerciseLink
}
