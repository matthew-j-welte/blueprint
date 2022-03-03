using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class RegimenFormView
  {
    public string RegimenId { get; set; }
    public string RegimenName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public IEnumerable<WorkoutLink> Workouts { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
  }
}