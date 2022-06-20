using System.Collections.Generic;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.ExerciseTracker.Models
{
  public class ExerciseFormView : BaseEntityModel
  {
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string Description { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public IEnumerable<string> ExerciseLabels { get; set; }
    public ExerciseState State { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public ExerciseLink ParentVariationExercise { get; set; }
  }
}