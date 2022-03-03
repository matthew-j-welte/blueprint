using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.ExerciseTracker.Models
{
  public class Exercise : CosmosEntity, ICosmosEntity
  {
    public override PartitionKey PK => new PartitionKey($"{this.GetType().Name}-{this.ExerciseId}");
    public string ExerciseId => this.Id;
    public string ExerciseName { get; set; }
    public string Description { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public IEnumerable<string> ExerciseLabels { get; set; }
    public ExerciseState State { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public MemberRef Author { get; set; }
    public ExerciseLink ParentVariationExercise { get; set; }
  }
}