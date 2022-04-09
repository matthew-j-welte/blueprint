package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Workout struct {
	ID                  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	RegimenId           string
	WorkoutName         string
	WorkoutDescription  string
	Difficulty          FitnessDifficulty
	ExerciseAssignments []WorkoutExerciseAssignment
	BackupExercises     []ExerciseLink
	WorkoutLabels       []string
}

type WorkoutRef struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	RegimenId     string
	WorkoutName   string
	Difficulty    FitnessDifficulty
	MusclesWorked []string
}

type WorkoutEntry struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	WorkoutId     string
	RegimenId     string
	WorkoutIndex  int
	TimeSubmitted primitive.DateTime
	SetGoals      []WorkoutSet
	SetEntries    []WorkoutSet
}

type WorkoutEntryRef struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	WorkoutId     string
	RegimenId     string
	WorkoutIndex  int
	TimeSubmitted primitive.DateTime
	PointsEarned  int
}

type WorkoutExerciseAssignment struct {
	Order                int
	SetIdentifier        string
	SpecialSetIdentifier string
	ExerciseId           string
	ExerciseName         string
	HeavyAim             ExerciseAimInfo
	ConditionedAim       ExerciseAimInfo
	DurableAim           ExerciseAimInfo
	SpecializedSetType   SpecializedSetType
	MusclesWorked        []string
}

type ExerciseAimInfo struct {
	AimBonusCutoff int
	ExerciseAim    ExerciseAim
}

type WorkoutSet struct {
	EntryId       string
	SetIdentifier string
	Weight        int
	Reps          int
}
