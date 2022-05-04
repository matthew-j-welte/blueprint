using System;
using System.Collections.Generic;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutEntryFormView : BaseEntityModel
  {
    public string WorkoutEntryId { get; set; }
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int? WorkoutIndex { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public int PointsEarned { get; set; }
    public IEnumerable<WorkoutSetEntry> WorkoutSetGoals { get; set; }
    public IEnumerable<WorkoutSetEntry> WorkoutSetEntries { get; set; }
  }
}