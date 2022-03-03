using System;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutEntry : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.WorkoutId}");
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int WorkoutIndex { get; set; }
    public string WorkoutEntryId { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public int PointsEarned { get; set; }
  }
}