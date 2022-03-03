using System.Collections.Generic;

namespace BlueprintGym.Business.WorkoutTracker.Models
{
  public class MemberHomepageView
  {
    public IEnumerable<int> SmartScoreDataPoints { get; set; }
    public string NextWorkoutId { get; set; }
    public string ActiveRegimenId { get; set; }
  }
}