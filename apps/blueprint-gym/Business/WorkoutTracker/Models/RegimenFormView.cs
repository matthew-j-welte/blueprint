using System;
using System.Collections.Generic;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class RegimenFormView : BaseEntityModel
  {
    public string RegimenId { get; set; }
    public string RegimenName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public string RegimenDescription { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public IEnumerable<WorkoutLink> Workouts { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
  }
}