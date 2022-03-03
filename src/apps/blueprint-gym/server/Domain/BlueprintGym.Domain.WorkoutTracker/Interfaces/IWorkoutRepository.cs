using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;

namespace BlueprintGym.Domain.WorkoutTracker.Interfaces
{
  public interface IWorkoutRepository
  {
    IBaseRepository<Workout> Workout { get; }
    IBaseRepository<WorkoutRef> WorkoutRef { get; }
    IBaseRepository<WorkoutEntry> WorkoutEntry { get; }
    IBaseRepository<WorkoutSet> WorkoutSet { get; }
  }
}