using System;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutEntryRef : CosmosEntity, ICosmosEntity
  {
    public override string PK => this.WorkoutId;
    public string WorkoutEntryId { get; set; }
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int WorkoutIndex { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public int PointsEarned { get; set; }
  }
}