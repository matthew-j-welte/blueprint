import { FitnessDifficulty } from "./enums.model";

export interface BaseEntityModel {
  id?: string | null;
  modifiedOn?: Date | null;
}

export interface BlobObjectDto {
  container: string;
  fileName: string;
}

export interface ExerciseLookupDto {
  exerciseId: string;
  exerciseName: string;
  descriptionSnippet: string;
  difficulty: FitnessDifficulty;
  musclesWorked: string[];
}

export interface WorkoutLink {
  workoutId: string;
  workoutName: string;
}
