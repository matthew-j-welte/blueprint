using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.ExerciseTracker.Models
{
  public class ExerciseRef : CosmosEntity, ICosmosEntity
  {
    public override string PK => $"{this.GetType().Name}-{this.State}";
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string DescriptionSnippet { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public ExerciseState State { get; set; } = ExerciseState.Personal;
  }
}