using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;

namespace BlueprintGym.Business.Shared.Models
{
  public class ExerciseLookupDto
  {
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    // max length: 100 or so
    public string DescriptionSnippet { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
  }
}
