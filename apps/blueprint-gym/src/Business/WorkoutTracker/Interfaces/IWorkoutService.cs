using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.WorkoutTracker.Interfaces
{
  public interface IWorkoutService
  {
    // Workout
    Task<WorkoutFormView> SaveWorkout(WorkoutFormView workout);
    Task<WorkoutFormView> GetWorkout(string workoutId);
    Task<bool> DeleteWorkout(string workoutId);

    // Search
    Task<IEnumerable<WorkoutLink>> SearchWorkoutLinksByName(string name);
    Task<IEnumerable<WorkoutLookupDto>> SearchWorkoutLookupsByName(string name);
    Task<IEnumerable<WorkoutLink>> GatAllWorkoutLinks();
    Task<IEnumerable<WorkoutLookupDto>> GatAllWorkoutLookups();
  }
}