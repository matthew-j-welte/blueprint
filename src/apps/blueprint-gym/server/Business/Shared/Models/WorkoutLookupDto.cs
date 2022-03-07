using System.Collections.Generic;

namespace BlueprintGym.Business.Shared.Models
{
  public class WorkoutLookupDto
  {
    public string WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public int ExerciseCount { get; set; }
    public IEnumerable<string> MusclesWorked { get; set; }
    public IEnumerable<string> Labels { get; set; }
  }
}