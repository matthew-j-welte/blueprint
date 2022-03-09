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
