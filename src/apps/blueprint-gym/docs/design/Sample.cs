


public class WorkoutEntryDto
{
  public string WorkoutId { get; set; }
  public string RegimenId { get; set; }
  public int WorkoutIndex { get; set; }
  public string WorkoutEntryId { get; set; }
  public DateTimeOffset TimeSubmitted { get; set; }
  public int PointsEarned { get; set; }
}

public class WorkoutEntry
{
  public string PK = $"{this.GetType().Name}-{this.WorkoutId}";
  public string WorkoutId { get; set; }
  public string RegimenId { get; set; }
  public int WorkoutIndex { get; set; }
  public string WorkoutEntryId { get; set; }
  public DateTimeOffset TimeSubmitted { get; set; }
  public int PointsEarned { get; set; }
}