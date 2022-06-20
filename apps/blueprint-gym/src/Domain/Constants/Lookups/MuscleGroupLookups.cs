using System.Collections.Generic;

namespace Constants.Lookups
{
  public static class MuscleGroupLookups
  {
    public static Dictionary<string, IEnumerable<string>> BasicGroupingToTrainerGroupingLookup = new Dictionary<string, IEnumerable<string>> {
            { "Chest", new []{ "Lower Chest", "Upper Chest" } },
            { "Shoulders", new []{ "Shoulders" } },
            { "Back", new []{ "Lower Back", "Upper Back", } },
            { "Arms", new []{ "Biceps", "Triceps", "Forearms/Grip" } },
            { "Abs", new []{ "Inner Abs", "Outter Abs", } },
            { "Legs", new []{ "Upper Front Legs", "Upper Back Legs", "Glutes", "Lower Legs" } }
        };
  }
}