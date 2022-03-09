using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Models;

namespace BlueprintGym.Business.WorkoutTracker.Interfaces
{
  public interface IWorkoutEntryService
  {
    Task<IEnumerable<WorkoutEntryFormView>> GetWorkoutEntries(string workoutId);
    Task<WorkoutEntryFormView> SaveWorkoutEntry(WorkoutEntryFormView workoutEntry);
    Task<bool> DeleteWorkoutEntry(string workoutEntryId);
    Task<int> DeleteWorkoutEntries(string workoutId);
  }
}