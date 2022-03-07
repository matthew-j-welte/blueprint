using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;

namespace BlueprintGym.Domain.WorkoutTracker.Models.Containers
{
  public class WorkoutExerciseAssignment
  {
    public int Order { get; set; }
    public string SpecialSetIdentifier { get; set; }
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public ExerciseAimInfo HeavyAim { get; set; }
    public ExerciseAimInfo ConditionedAim { get; set; }
    public ExerciseAimInfo DurableAim { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
  }
}