using System.Collections.Generic;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutDto : BaseEntityModel
  {
    public string WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public string WorkoutDescription { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<WorkoutExerciseAssignment> ExerciseAssignments { get; set; }
    public IEnumerable<ExerciseLink> BackupExercises { get; set; }
    public IEnumerable<string> WorkoutLabels { get; set; }
  }
}