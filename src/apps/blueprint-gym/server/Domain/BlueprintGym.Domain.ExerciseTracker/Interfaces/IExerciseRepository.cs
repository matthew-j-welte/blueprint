using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;

namespace BlueprintGym.Domain.ExerciseTracker.Interfaces
{
  public interface IExerciseRepository
  {
    IBaseRepository<Exercise> Exercise { get; }
    IBaseRepository<ExerciseRef> ExerciseRef { get; }
  }
}