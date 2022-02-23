import { BaseEntityModel } from './common.model';

export enum MemberNotificationType {
  ChallengeInvite,
  ExerciseSubmissionApproval,
  ChallengeTemplateSubmissionApproval,
  NewConnectionRequest,
  ChallengeCompleted,
  MilestoneEarned,
  LevelUp,
}

export interface MemberAccountDto extends BaseEntityModel {
  memberId?: string | undefined;
  memberNotificationId?: string | undefined;
  fullName?: string | undefined;
  accountName?: string | undefined;
  weight?: string | undefined;
  workoutFrequency?: number | undefined;
  profilePicUrl?: string | undefined;
  defaultWebpageTheme?: string | undefined;
  memberConnections?: MemberConnectionDto[] | undefined;
  currentShape?: string | undefined;
  strengths?: string[] | undefined;
  weaknesses?: string[] | undefined;
  goals?: string[] | undefined;
}

export interface MemberConnectionDto {
  memberId?: string | undefined;
  memberAccountName?: string | undefined;
  memberPictureUrl?: string | undefined;
}

export interface MemberAccountFormChoicesDto {
  currentShapeChoices: string[];
  strengthChoices: string[];
  weaknessChoices: string[];
  goalChoices: string[];
}

export interface MemberLookupDto {
  memberId: string;
  accountName: string;
  fullName: string;
  profilePicUrl: string;
  isExactMatch: boolean;
  memberNotificationId: string;
}

export interface MemberLoginDto {
  memberId?: string | undefined;
  // password?: string | undefined;
  accountName: string;
}

export interface MemberNotificationDto extends BaseEntityModel {
  memberNotificationsId: string;
  title: string;
  body: string;
  notificationType: MemberNotificationType;
  timeReceieved: string | null;
  identifier?: string | null;
}
