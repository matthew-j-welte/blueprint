package services

type ExerciseFormView struct {
	ID                      string
	ExerciseName            string
	Description             string
	MusclesWorked           []string
	Labels                  []string
	State                   ExerciseState
	Difficulty              FitnessDifficulty
	ParentVariationExercise ExerciseLink
}
