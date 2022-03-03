using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutRef : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey(this.GetType().Name);
    public string WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public WorkoutOrigin WorkoutOrigin { get; set; }
  }
}