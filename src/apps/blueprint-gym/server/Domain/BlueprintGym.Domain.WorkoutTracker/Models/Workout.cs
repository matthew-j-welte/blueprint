using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class Workout : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.WorkoutId}");
    public string WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public string MemberId { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<WorkoutExerciseAssignment> ExerciseAssignments { get; set; }
    public IEnumerable<ExerciseLink> BackupExercises { get; set; }
    public WorkoutOrigin WorkoutOrigin { get; set; }
  }
}