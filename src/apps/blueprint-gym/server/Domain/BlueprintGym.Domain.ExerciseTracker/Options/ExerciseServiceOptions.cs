namespace BlueprintGym.Domain.ExerciseTracker.Options
{
  public class ExerciseServiceOptions
  {
    public const string OptionsKey = "ExerciseService";
    public int ExerciseApprovalLockTimeoutSeconds { get; set; }
  }
}