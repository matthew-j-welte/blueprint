using System;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class WorkoutEntryLookupDto
  {
    public string WorkoutEntryId { get; set; }
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int WorkoutIndex { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public int PointsEarned { get; set; }
  }
}