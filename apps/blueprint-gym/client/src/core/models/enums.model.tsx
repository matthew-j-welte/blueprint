export enum ExerciseState {
  Personal,
  Published,
  All,
}

export enum FitnessDifficulty {
  Beginner,
  Easy,
  Moderate,
  Advanced,
  Expert,
  Dangerous,
}

export enum ExerciseAim {
  Heavy,
  Conditioned,
  Durable,
}

export enum SpecializedSetType {
  CrossFit,
  Weave,
  Countdown,
  XbyY,
}

export enum MuscleSpecificity {
  Basic,
  Focused,
  Trainer,
}

export enum PublishRequestStatus {
  NotStarted,
  InReview,
  Complete,
  Rejected,
  MoreInformationNeeded,
}

export function enumToSelectOptions<T1>(map: Map<T1, string>): {
  value: any;
  label: string | undefined;
}[] {
  return getMapKeys(map).map((k) => ({ value: k, label: map.get(k) }));
}

export const getMapKeys = (map: Map<any, any>) => {
  const list = [];
  for (const item of map.keys()) {
    list.push(item);
  }
  return list;
};

export const FitnessDifficultyLookup: Map<FitnessDifficulty, string> = new Map([
  [FitnessDifficulty.Beginner, "Beginner"],
  [FitnessDifficulty.Easy, "Easy"],
  [FitnessDifficulty.Moderate, "Moderate"],
  [FitnessDifficulty.Advanced, "Advanced"],
  [FitnessDifficulty.Expert, "Expert"],
  [FitnessDifficulty.Dangerous, "Dangerous"],
]);

export const MuscleGroupToLabelMap: { [key: string]: string } = {
  [MuscleSpecificity.Basic]: "Basic",
  [MuscleSpecificity.Focused]: "Focused",
  [MuscleSpecificity.Trainer]: "Trainer Level",
};

export const MuscleSpecificityToLabelLookup: Map<MuscleSpecificity, string> = new Map([
  [MuscleSpecificity.Basic, "Basic"],
  [MuscleSpecificity.Focused, "Focused"],
  [MuscleSpecificity.Trainer, "Trainer Level"],
]);

export const PublishRequestStatusToLabelLookup: Map<PublishRequestStatus, string> = new Map([
  [PublishRequestStatus.NotStarted, "Not Started"],
  [PublishRequestStatus.InReview, "In Review"],
  [PublishRequestStatus.Complete, "Complete"],
  [PublishRequestStatus.Rejected, "Rejected"],
  [PublishRequestStatus.MoreInformationNeeded, "More Information Needed"],
]);

export const PublishRequestStatusToColorLookup: Map<PublishRequestStatus, string> = new Map([
  [PublishRequestStatus.NotStarted, "rgb(12, 98, 148)"],
  [PublishRequestStatus.InReview, "rgb(14, 175, 198)"],
  [PublishRequestStatus.Complete, "rgb(174, 230, 136)"],
  [PublishRequestStatus.Rejected, "rgb(245, 20, 106)"],
  [PublishRequestStatus.MoreInformationNeeded, "rgb(240, 207, 73)"],
]);

export const PublishRequestStatusToBackgroundColorLookup: Map<PublishRequestStatus, string> = new Map([
  [PublishRequestStatus.NotStarted, "rgba(12, 98, 148, 0.1)"],
  [PublishRequestStatus.InReview, "rgba(34, 235, 212, 0.1)"],
  [PublishRequestStatus.Complete, "rgba(174, 230, 136, 0.1)"],
  [PublishRequestStatus.Rejected, "rgba(245, 20, 106, 0.1)"],
  [PublishRequestStatus.MoreInformationNeeded, "rgba(240, 207, 73, 0.1)"],
]);

export const PublishRequestStatusToBorderColorLookup: Map<PublishRequestStatus, string> = new Map([
  [PublishRequestStatus.NotStarted, "rgba(12, 98, 148, 0.2)"],
  [PublishRequestStatus.InReview, "rgba(34, 235, 212, 0.2)"],
  [PublishRequestStatus.Complete, "rgba(174, 230, 136, 0.2)"],
  [PublishRequestStatus.Rejected, "rgba(245, 20, 106, 0.2)"],
  [PublishRequestStatus.MoreInformationNeeded, "rgba(240, 207, 73, 0.2)"],
]);
