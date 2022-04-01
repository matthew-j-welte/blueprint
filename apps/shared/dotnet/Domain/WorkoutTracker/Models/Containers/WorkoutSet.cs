namespace WorkoutTracker.Models.Containers
{
    public class WorkoutSet
    {
      public string EntryId { get; set; } = Guid.NewGuid().ToString();
      public string SetIdentifier { get; set; }
      public int Weight { get; set; }
      public int Reps { get; set; }       
    }
}