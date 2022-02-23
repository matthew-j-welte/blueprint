import { BaseEntityModel } from './common.model';

export interface BaseMilestoneDto extends BaseEntityModel {
  milestoneId?: string | undefined;
  milestoneName?: string | undefined;
  imageUrl?: string | undefined;
  description?: string | undefined;
  rarity?: MilestoneRarity | undefined;
  milestoneType?: MilestoneType | undefined;
  experiencePoints?: number | undefined;
}

export enum MilestoneRarity {
  VeryCommon,
  Common,
  Uncommon,
  Unique,
  VeryUnique,
  Rare,
  VeryRare,
  Impossible,
}

export enum MilestoneType {
  ExerciseSpecific,
  ExerciseGroupSpecific,
  ChallengeSpecific,
  Global,
}

export interface MilestoneCardDto {
  milestoneId: string;
  milestoneName: string;
  experiencePoints: number;
  rarity: MilestoneRarity;
  milestoneType: MilestoneType;
}

export interface MilestoneSubmissionPreviewDto {
  milestoneId: string;
  milestoneName: string;
  milestoneType: MilestoneType;
}

export const milestoneRarityFriendlyNameMapper = new Map<MilestoneRarity, string>([
  [MilestoneRarity.VeryCommon, 'Very Common'],
  [MilestoneRarity.Common, 'Common'],
  [MilestoneRarity.Uncommon, 'Uncommon'],
  [MilestoneRarity.Unique, 'Unique'],
  [MilestoneRarity.VeryUnique, 'Very Unique'],
  [MilestoneRarity.Rare, 'Rare'],
  [MilestoneRarity.VeryRare, 'Very Rare'],
  [MilestoneRarity.Impossible, 'Impossible'],
]);

export const milestoneTypeFriendlyNameMapper = new Map<MilestoneType, string>([
  [MilestoneType.ExerciseSpecific, 'Exercise Specific'],
  [MilestoneType.ExerciseGroupSpecific, 'Exercise Group Specific'],
  [MilestoneType.ChallengeSpecific, 'Challenge Specific'],
  [MilestoneType.Global, 'Global'],
]);

export const milestoneTypeEndpointStringMapper = new Map<MilestoneType, string>([
  [MilestoneType.ExerciseSpecific, 'exercise'],
  [MilestoneType.ExerciseGroupSpecific, 'exercise-group'],
  [MilestoneType.ChallengeSpecific, 'challenge'],
  [MilestoneType.Global, 'global'],
]);
