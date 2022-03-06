using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutRef : CosmosEntity, ICosmosEntity
  {
    public override string PK => this.GetType().Name;
    public string WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
  }
}