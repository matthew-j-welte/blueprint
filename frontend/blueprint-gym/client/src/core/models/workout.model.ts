import { ExerciseAim, FitnessDifficulty, MuscleSpecificity, SpecializedSetType } from "./enums.model";
import { ExerciseLink } from "./exercise.model";
import { BaseEntityModel, WorkoutLink } from "./shared.model";

export interface RegimenFormView extends BaseEntityModel {
  regimenId: string;
  regimenName: string;
  difficulty: FitnessDifficulty;
  regimenDescription: string;
  startDate: Date;
  endDate: Date;
  workouts: WorkoutLink[];
  muscleSpecificity: MuscleSpecificity;
}

export interface WorkoutDto extends BaseEntityModel {
  workoutId: string;
  regimenId: string;
  workoutName: string;
  workoutDescription: string;
  difficulty: FitnessDifficulty;
  exerciseAssignments: WorkoutExerciseAssignment[];
  backupExercises: ExerciseLink[];
  workoutLabels: string[];
}

export interface WorkoutEntryFormView extends BaseEntityModel {
  workoutEntryId: string;
  workoutId: string;
  regimenId: string;
  workoutIndex: number | null;
  timeSubmitted: Date;
  pointsEarned: number;
  workoutSetGoals: WorkoutSetEntry[];
  workoutSetEntries: WorkoutSetEntry[];
}

export interface WorkoutFormView extends WorkoutDto {}

export interface WorkoutExerciseAssignment {
  order: number;
  setIdentifier: string;
  specialSetIdentifier: string;
  exerciseId: string;
  exerciseName: string;
  specializedSetType: SpecializedSetType | null;
  musclesWorked: string[];
}

// Containers

export interface WorkoutSetEntry {
  entryId: string;
  setIdentifier: string;
  weight: number;
  reps: number;
}
