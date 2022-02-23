import { BaseEntityModel } from './common.model';

export interface TrainingDashboardViewModel {
  exerciseCards: ExerciseCardDto[];
}

export interface ExerciseSubmissionViewModel extends BaseEntityModel {
  exerciseId?: string;
  name?: string;
  description?: string;
  author?: ExerciseAuthorDto;
  category?: ExerciseCategory;
  iconUrl?: string;
  instructionVideoUrl?: string;
  difficulty?: ExerciseDifficulty;
  injuryRisks?: string;
  similarExercises?: ExerciseCardDto[];
  exerciseMilestones?: ExerciseMilestoneDto[];
  visionTrackingEnabled?: boolean;
}

export interface ExerciseSubmissionPreviewDto {
  exerciseId?: string;
  name?: string;
  author?: ExerciseAuthorDto;
}

export interface ExerciseDetailsViewModel extends BaseEntityModel {
  id?: string | null;
  exerciseId: string;
  name: string;
  description: string;
  author?: ExerciseAuthorDto;
  category: ExerciseCategory;
  iconUrl: string;
  instructionVideoUrl?: string;
  difficulty: ExerciseDifficulty;
  injuryRisks?: InjuryRiskDto[];
  similarExercises?: ExerciseCardDto[];
  exerciseMilestones?: ExerciseMilestoneDto[];
  visionTrackingEnabled: boolean;
  createdOn?: Date | null;
}

export interface ExerciseAuthorDto {
  authorUserId: string;
  authorName: string;
}

export interface ExerciseCardDto {
  exerciseId: string;
  exerciseName: string;
  exerciseCategory: ExerciseCategory;
  exerciseDifficulty: ExerciseDifficulty;
  exerciseIconUrl: string;
  repVisionEnabled: boolean;
  createdOn: Date;
}

export interface InjuryRiskDto {
  riskName: string;
  riskDescription: string;
}

export interface ExerciseMilestoneDto {
  milestoneName: string;
  milestoneIcon: string;
}

export enum ExerciseCategory {
  Chest,
  Back,
  Abdomen,
  AnteriorLegs,
  PosteriorLegs,
}

export enum ExerciseDifficulty {
  Beginner,
  Easy,
  Moderate,
  Advanced,
  Expert,
  Master,
}

export const exerciseCategoryFriendlyNameMapper = new Map<ExerciseCategory, string>([
  [ExerciseCategory.Chest, 'Chest'],
  [ExerciseCategory.Back, 'Back'],
  [ExerciseCategory.Abdomen, 'Abdomen'],
  [ExerciseCategory.AnteriorLegs, 'Anterior Legs'],
  [ExerciseCategory.PosteriorLegs, 'Posterior Legs'],
]);

export const exerciseDifficultyFriendlyNameMapper = new Map<ExerciseDifficulty, string>([
  [ExerciseDifficulty.Beginner, 'Beginner'],
  [ExerciseDifficulty.Easy, 'Easy'],
  [ExerciseDifficulty.Moderate, 'Moderate'],
  [ExerciseDifficulty.Advanced, 'Advanced'],
  [ExerciseDifficulty.Expert, 'Expert'],
  [ExerciseDifficulty.Master, 'Master'],
]);
