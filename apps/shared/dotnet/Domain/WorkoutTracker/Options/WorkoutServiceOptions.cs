namespace BlueprintGym.Domain.WorkoutTracker.Options
{
  public class WorkoutServiceOptions
  {
    public const string OptionsKey = "WorkoutService";
    public int WorkoutApprovalLockTimeoutSeconds { get; set; }
  }
}