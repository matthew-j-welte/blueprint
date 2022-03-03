// TODO: Make this reusable
namespace BlueprintGym.Domain.WorkoutTracker.Options
{
  public class DatabaseInfoOptions
  {
    public const string OptionsKey = "DatabaseInfo";
    public string DatabaseName { get; set; }
    public DatabaseContainers DatabaseContainers { get; set; }
  }

  public class DatabaseContainers
  {
    public DatabaseContainer WorkoutContainer { get; set; }
  }

  public class DatabaseContainer
  {
    public string Name { get; set; }
    public bool IsRefContainer { get; set; }
  }
}