import { ExerciseState, FitnessDifficulty } from "./enums.model";
import { BaseEntityModel } from "./shared.model";

export interface ExerciseFormView extends BaseEntityModel {
  exerciseId: string;
  exerciseName: string;
  description: string;
  musclesWorked: string[];
  exerciseLabels: string[];
  state: ExerciseState;
  difficulty: FitnessDifficulty;
  parentVariationExercise: ExerciseLink;
}

export interface ExerciseLink {
  exerciseId: string;
  exerciseName: string;
}
