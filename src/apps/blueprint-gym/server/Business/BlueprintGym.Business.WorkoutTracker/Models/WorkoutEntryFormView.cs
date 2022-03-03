using System;
using BlueprintGym.Business.Shared.Models;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutEntryFormView : BaseEntityModel
  {
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int WorkoutIndex { get; set; }
    public string WorkoutEntryId { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public int PointsEarned { get; set; }
  }

}