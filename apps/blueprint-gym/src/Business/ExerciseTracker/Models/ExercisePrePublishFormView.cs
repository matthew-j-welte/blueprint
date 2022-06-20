using BlueprintGym.Domain.Constants.Enums;

namespace BlueprintGym.Business.ExerciseTracker.Models
{
  public class ExercisePrePublishFormView : ExerciseFormView
  {
    public MuscleSpecificity PreviousMuscleSpecificity { get; set; }
  }
}