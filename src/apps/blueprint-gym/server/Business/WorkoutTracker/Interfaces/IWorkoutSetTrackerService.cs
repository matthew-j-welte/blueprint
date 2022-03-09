using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Models;

namespace BlueprintGym.Business.WorkoutTracker.Interfaces
{
  public interface IWorkoutSetService
  {
    Task<IEnumerable<WorkoutSetFormView>> GetWorkoutSets(string workoutEntryId);
    Task<WorkoutSetFormView> SaveWorkoutSet(WorkoutSetFormView workoutSet);
    Task<IEnumerable<WorkoutSetFormView>> SaveWorkoutSets(IEnumerable<WorkoutSetFormView> workoutSets);
    Task<IEnumerable<WorkoutSetFormView>> ReplaceAllSets(IEnumerable<WorkoutSetFormView> workoutSets);
    Task<int> DeleteWorkoutSets(string workoutEntryId);
  }
}