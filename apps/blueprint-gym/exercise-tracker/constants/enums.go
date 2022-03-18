package constants

type ExerciseAim int
type ExerciseState int
type FitnessDifficulty int
type MuscleSpecificity int
type SpecializedSetType int


const (
		Heavy ExerciseAim = iota
		Balanced
		Conditioned
		Durable
)

const (
	Personal ExerciseState = iota
	Published
	All
)

const (
	Beginner FitnessDifficulty = iota
	Easy
	Moderate
	Advanced
	Expert
	Dangerous
)

const (
	Basic MuscleSpecificity = iota
	Focused
	Trainer
)
const (
	CrossFit SpecializedSetType = iota
	Weave
	Countdown
	XbyY
)