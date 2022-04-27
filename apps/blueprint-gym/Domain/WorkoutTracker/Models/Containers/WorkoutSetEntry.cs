using System;

namespace BlueprintGym.Domain.WorkoutTracker.Models.Containers
{
  public class WorkoutSetEntry : WorkoutSet
  {
    public string EntryId { get; set; } = Guid.NewGuid().ToString();
    public string SetIdentifier { get; set; }
    public WorkoutSet SetGoal { get; set; }
  }
}