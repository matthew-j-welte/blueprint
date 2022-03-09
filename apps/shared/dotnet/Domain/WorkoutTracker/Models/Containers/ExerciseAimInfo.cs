using BlueprintGym.Domain.Constants.Enums;

namespace BlueprintGym.Domain.WorkoutTracker.Models.Containers
{
  public class ExerciseAimInfo
  {
    public int AimBonusCutoff { get; set; }
    public ExerciseAim ExerciseAim { get; set; }
  }
}