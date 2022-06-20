import { ExerciseState, FitnessDifficulty, MuscleSpecificity, PublishRequestStatus } from "./enums.model";
import { BaseEntityModel, BlueScoreFormula } from "./shared.model";

export interface ExerciseFormView extends BaseEntityModel {
  exerciseId: string;
  exerciseName: string;
  description: string;
  musclesWorked: string[];
  exerciseLabels: string[];
  state: ExerciseState;
  muscleSpecificity: MuscleSpecificity;
  difficulty: FitnessDifficulty;
  parentVariationExercise: ExerciseLink;
}

export interface ExercisePrePublishFormView extends BaseEntityModel, ExerciseFormView {
  previousMuscleSpecificity: MuscleSpecificity;
}

export interface ExercisePublishFormView extends BaseEntityModel, ExercisePrePublishFormView {
  videoUrl: string;
  formula: BlueScoreFormula;
}

export interface ExercisePublishRequestDto extends BaseEntityModel {
  exerciseId: string;
  exerciseName: string;
  userId: string;
  timeSubmitted: Date;
  publishRequestStatus: PublishRequestStatus;
  assignedToUserId: string;
  statusJustification: string;
  propertyChanges: { [key: string]: BeforeAfter };
}

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface ExerciseLink {
  exerciseId: string;
  exerciseName: string;
}
