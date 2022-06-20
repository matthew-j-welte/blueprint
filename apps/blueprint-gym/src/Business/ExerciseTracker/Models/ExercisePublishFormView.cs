using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.ExerciseTracker.Models
{
  public class ExercisePublishFormView : ExercisePrePublishFormView
  {
    public string VideoUrl { get; set; }
    public BlueScoreFormula Formula { get; set; }
  }
}