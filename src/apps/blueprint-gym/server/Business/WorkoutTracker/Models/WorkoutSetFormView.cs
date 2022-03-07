using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutSetFormView : BaseEntityModel
  {
    public string EntryId => this.Id;
    public string WorkoutId { get; set; }
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string WorkoutEntryId { get; set; }
    public ExerciseAimInfo HeavyAim { get; set; }
    public ExerciseAimInfo ConditionedAim { get; set; }
    public ExerciseAimInfo DurableAim { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    // TODO: Switch these to a list and change this model to a more meaningful name
    public int Weight { get; set; }
    public int Reps { get; set; }
  }
}