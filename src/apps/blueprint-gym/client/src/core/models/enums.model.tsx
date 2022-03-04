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
  Balanced,
  Conditioned,
  Durable,
}

export enum SpecializedSetType {
  CrossFit,
  Weave,
  Countdown,
  XbyY,
}

export enum WorkoutOrigin {
  Personal,
  TemplateCopy,
  TemplateOrigin,
}

export enum MuscleSpecificity {
  Basic,
  Focused,
  Trainer,
}

export const enumToDropdownOptionsList = (map: Map<any, any>, setter: any) =>
  getMapKeys(map).map((k) => (
    <option key={k} onSelect={() => setter(k)}>
      {FitnessDifficultyLookup.get(k)}
    </option>
  ));

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
