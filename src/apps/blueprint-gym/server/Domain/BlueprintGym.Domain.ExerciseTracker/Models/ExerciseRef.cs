using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.ExerciseTracker.Models
{
  public class ExerciseRef : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.State}");
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string DescriptionSnippet { get; set; }
    public string MusclesWorked { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public ExerciseState State { get; set; } = ExerciseState.Personal;
  }
}