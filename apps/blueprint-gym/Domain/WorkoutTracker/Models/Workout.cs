using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class Workout : CosmosEntity, ICosmosEntity
  {
    public override string PK => $"{this.GetType().Name}-{this.WorkoutId}";
    public string WorkoutId => this.Id;
    public string RegimenId { get; set; }
    public string WorkoutName { get; set; }
    public string WorkoutDescription { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<WorkoutExerciseAssignment> ExerciseAssignments { get; set; }
    public IEnumerable<ExerciseLink> BackupExercises { get; set; }
    public IEnumerable<string> WorkoutLabels { get; set; }
  }
}