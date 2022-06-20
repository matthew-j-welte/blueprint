import { FitnessDifficulty } from "../models/enums.model";

export const DifficultyToColorLookup: any = {
  [FitnessDifficulty.Easy]: "rgb(45, 218, 91)",
  [FitnessDifficulty.Moderate]: "rgb(105, 69, 224)",
  [FitnessDifficulty.Advanced]: "rgb(238, 156, 69)",
  [FitnessDifficulty.Expert]: "rgb(217, 103, 71)",
  [FitnessDifficulty.Dangerous]: "rgb(222, 48, 48)",
};
