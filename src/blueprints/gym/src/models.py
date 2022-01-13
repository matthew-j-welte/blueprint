from dataclasses import dataclass
from typing import List


@dataclass
class Exercise:
    exerciseId: str
    name: str
    author: str
    description: str
    image: str
    musclesWorked: List[str]
    labels: List[str]


@dataclass
class WorkoutSetExercise:
    exerciseId: str
    exerciseName: str
    specialExerciseFlag: int
    exerciseIcon: str
    setAimCutoff: int  # Weight for heavy aim, reps for cardio aim


@dataclass
class WorkoutSet:
    setType: str
    setAim: str
    exercises: List[WorkoutSetExercise]


@dataclass
class Workout:
    workoutId: str
    name: str
    author: str
    workoutSets: List[WorkoutSet]


@dataclass
class SetGoal:
    goalWeight: int
    goalReps: int


@dataclass
class RegimenWorkouts:
    workoutId: str
    workoutName: str
    setGoals: List[SetGoal]


@dataclass
class Regimen:
    regimenId: str
    name: str
    author: str
    startDate: str
    endDate: str
    workouts: List[RegimenWorkouts]


@dataclass
class ExerciseEntry:
    exerciseId: str
    reps: int
    weight: int
    cutoff: int
    smartScore: int


@dataclass
class SetEntry:
    setsPerformed: int
    setType: str
    setAim: str
    exerciseEntries: List[ExerciseEntry]


@dataclass
class WorkoutEntry:
    workoutId: str
    userId: str
    setEntries: List[SetEntry]
