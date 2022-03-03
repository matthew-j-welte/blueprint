

using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutSet : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.WorkoutEntryId}");
    public string EntryId { get; set; }
    public string WorkoutEntryId { get; set; }
    public string SetIdentifier { get; set; }
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public int AimBonusCutoff { get; set; }
    public ExerciseAim ExerciseAim { get; set; }
    public SpecializedSetType? SpecializedSetType { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }

  }
}