using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class Regimen : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.MemberId}");
    public string MemberId { get; set; }
    public string RegimenId { get; set; }
    public string RegimenName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public IEnumerable<WorkoutLink> Workouts { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
  }
}