import {
  ExerciseAim,
  FitnessDifficulty,
  MuscleSpecificity,
  SpecializedSetType,
  WorkoutOrigin,
} from "./enums.model";
import { ExerciseLink } from "./exercise.model";
import { BaseEntityModel, WorkoutLink } from "./shared.model";

export interface RegimenFormView {
  regimenId: string;
  regimenName: string;
  difficulty: FitnessDifficulty;
  startDate: Date;
  endDate: Date;
  workouts: WorkoutLink[];
  muscleSpecificity: MuscleSpecificity;
}

export interface WorkoutDto extends BaseEntityModel {
  workoutId: string;
  workoutName: string;
  memberId: string;
  difficulty: FitnessDifficulty;
  exerciseAssignments: WorkoutExerciseAssignment[];
  backupExercises: ExerciseLink[];
  workoutOrigin: WorkoutOrigin;
}

export interface WorkoutEntryFormView extends BaseEntityModel {
  workoutId: string;
  regimenId: string;
  workoutIndex: number;
  workoutEntryId: string;
  timeSubmitted: string;
  pointsEarned: number;
}

export interface WorkoutFormView extends WorkoutDto {}

export interface WorkoutSetFormView {
  entryId: string;
  workoutId: string;
  setIdentifier: string;
  exerciseId: string;
  exerciseName: string;
  workoutEntryId: string;
  aimBonusCutoff: number;
  exerciseAim: ExerciseAim;
  specializedSetType: SpecializedSetType | null;
  weight: number;
  reps: number;
}

export interface WorkoutExerciseAssignment {
  order: number;
  specialSetIdentifier: string;
  exerciseId: string;
  exerciseName: string;
  aimBonusCutoff: number;
  exerciseAim: ExerciseAim;
  specializedSetType: SpecializedSetType | null;
  musclesWorked: string[];
}
