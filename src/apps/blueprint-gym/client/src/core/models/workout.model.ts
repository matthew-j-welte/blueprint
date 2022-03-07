import {
  ExerciseAim,
  FitnessDifficulty,
  MuscleSpecificity,
  SpecializedSetType,
} from "./enums.model";
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
  workoutName: string;
  workoutDescription: string;
  difficulty: FitnessDifficulty;
  exerciseAssignments: WorkoutExerciseAssignment[];
  backupExercises: ExerciseLink[];
  workoutLabels: string[];
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
  heavyAim: ExerciseAimInfo;
  conditionedAim: ExerciseAimInfo;
  durableAim: ExerciseAimInfo;
  specializedSetType: SpecializedSetType | null;
  weight?: number | undefined;
  reps?: number | undefined;
}

export interface WorkoutExerciseAssignment {
  order: number;
  setIdentifier: string;
  specialSetIdentifier: string;
  exerciseId: string;
  exerciseName: string;
  heavyAim: ExerciseAimInfo;
  conditionedAim: ExerciseAimInfo;
  durableAim: ExerciseAimInfo;
  specializedSetType: SpecializedSetType | null;
  musclesWorked: string[];
}

export interface ExerciseAimInfo {
  aimBonusCutoff: number;
  exerciseAim: ExerciseAim;
  aimUnit: string;
}
