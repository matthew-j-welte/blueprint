using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutSetFormView
  {
    public string EntryId { get; set; }
    public string WorkoutId { get; set; }
    public string SetIdentifier { get; set; }
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string WorkoutEntryId { get; set; }
    public ExerciseAimInfo HeavyAim { get; set; }
    public ExerciseAimInfo ConditionedAim { get; set; }
    public ExerciseAimInfo DurableAim { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
  }
}