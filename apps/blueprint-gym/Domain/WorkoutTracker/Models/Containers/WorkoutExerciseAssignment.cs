using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Domain.WorkoutTracker.Models.Containers
{
  public class WorkoutExerciseAssignment
  {
    public int Order { get; set; }
    public string SetIdentifier { get; set; } = Guid.NewGuid().ToString();
    public string SpecialSetIdentifier { get; set; }
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public BlueScoreFormula BlueScoreFormula { get; set; }
    public int? PostBreakGoalSeconds { get; set; }
    public int? SetCountGoal { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
  }
}