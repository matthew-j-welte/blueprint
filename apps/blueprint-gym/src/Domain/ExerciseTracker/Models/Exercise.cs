using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Domain.ExerciseTracker.Models
{
  public class Exercise : CosmosEntity, ICosmosEntity
  {
    public override string PK => $"{this.GetType().Name}-{this.ExerciseId}";
    public string ExerciseId => this.Id;
    public string ExerciseName { get; set; }
    public string Description { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public IEnumerable<string> ExerciseLabels { get; set; }
    public ExerciseState State { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public MemberLink Author { get; set; }
    public ExerciseLink ParentVariationExercise { get; set; }
    public MuscleSpecificity PreviousMuscleSpecificity { get; set; }
    public string VideoUrl { get; set; }
    public BlueScoreFormula Formula { get; set; }
  }
}