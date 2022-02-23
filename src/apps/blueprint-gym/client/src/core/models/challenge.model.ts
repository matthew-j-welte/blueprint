import { BaseEntityModel } from './common.model';

export enum ChallengeType {
  Basic,
  Roulette,
  Showtime,
  FinishLine,
  LastOneStanding,
}

export enum ChallengeDifficulty {
  Beginner,
  Easy,
  Moderate,
  Advanced,
  Expert,
  Master,
}

export const challengeTypeFriendlyNameMapper = new Map<ChallengeType, string>([
  [ChallengeType.Basic, 'Basic'],
  [ChallengeType.Roulette, 'Roulette'],
  [ChallengeType.Showtime, 'Showtime'],
  [ChallengeType.FinishLine, 'Finish Line'],
  [ChallengeType.LastOneStanding, 'Last. One. Standing.'],
]);

export const challengeDifficultyFriendlyNameMapper = new Map<ChallengeDifficulty, string>([
  [ChallengeDifficulty.Beginner, 'Beginner'],
  [ChallengeDifficulty.Easy, 'Easy'],
  [ChallengeDifficulty.Moderate, 'Moderate'],
  [ChallengeDifficulty.Advanced, 'Advanced'],
  [ChallengeDifficulty.Expert, 'Expert'],
  [ChallengeDifficulty.Master, 'Master'],
]);

export interface ChallengeDashboardViewModel {
  challenge: ChallengeDto;
  challengeLeaderboard: ChallengeLeaderboardDto;
}

export interface ChallengeDto extends BaseEntityModel {
  challengeId?: string;
  challengeLeaderboardId?: string;
  name?: string;
  start?: string | null;
  end?: string | null;
  participants?: ChallengeParticipantDto[];
  inviteTimeoutMinutes?: number;
  offDays?: number;
  maxWorkoutMinutesPerDay?: number;
  maxWorkoutSessionsPerDay?: number;
  totalPoints?: number;
  admin?: ChallengeAdminDto;
  challengeType?: ChallengeType;
  difficulty?: ChallengeDifficulty;
  challengeExercisesLookup?: Record<string, ChallengeExerciseDto>; // { [key: string]: ChallengeExerciseDto };
  winnerMemberId?: string;
}

export interface ChallengeLeaderboardDto extends BaseEntityModel {
  challengeLeaderboardId: string;
  challengeMemberStatistics: Record<string, ChallengeLeaderboardMemberStatisticDto>;
}

export interface ChallengeLeaderboardMemberStatisticDto {
  memberId: string;
  memberNotificationId: string;
  points: number;
  challengeExerciseStatistics: Record<string, ChallengeLeaderboardMemberExerciseStatisticDto>;
}

export interface ChallengeLeaderboardMemberExerciseStatisticDto {
  exerciseId: string;
  points: number;
  challengeExerciseRuleStatistics: Record<string, ChallengeLeaderboardExerciseRuleStatisticDto>;
}

export interface ChallengeLeaderboardExerciseRuleStatisticDto {
  challengeId: string;
  memberId: string;
  exerciseId: string;
  order: number;
  points: number;
  reps: number;
  addedWeight: number;
}

export interface ChallengeParticipantDto {
  memberId: string;
  memberNotificationId: string;
  memberAccountName: string;
}

export interface ChallengeAdminDto {
  adminMemberId: string;
  adminAccountName: string;
}

export interface ChallengeExerciseDto {
  exerciseId?: string;
  exerciseName?: string;
  dailyPointMax?: number;
  exerciseRules?: Record<string, ChallengeExerciseRuleDto>;
}

export interface ChallengeExerciseRuleDto {
  addedWeight?: number | null;
  repsPerPoint?: number;
}

export interface ChallengeTemplateDto extends BaseEntityModel {
  challengeTemplateId: string;
  templateName: string;
  offDays: number;
  maxWorkoutMinutesPerDay: number;
  maxWorkoutSessionsPerDay: number;
  challengeType: ChallengeType;
  difficulty: ChallengeDifficulty;
}

export interface BaseChallengeTemplateCardDto {
  challengeTemplateId: string;
  templateName: string;
  challengeType: ChallengeType;
  difficulty: ChallengeDifficulty;
}

export interface GlobalChallengeTemplateCardDto extends BaseChallengeTemplateCardDto {}

export interface MemberChallengeCardDto {
  challengeId: string;
  memberId: string;
  challengeName: string;
  challengeType: ChallengeType;
  challengeDifficulty: ChallengeDifficulty;
  start: string | null;
  end: string | null;
}

export interface MemberChallengeTemplateCardDto extends BaseChallengeTemplateCardDto {
  memberId: string;
}
