using BlueprintGym.Domain.Constants.Enums;

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
    public int AimBonusCutoff { get; set; }
    public ExerciseAim ExerciseAim { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
  }
}