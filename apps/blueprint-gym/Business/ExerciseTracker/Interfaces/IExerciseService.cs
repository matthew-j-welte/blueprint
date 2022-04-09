using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.ExerciseTracker.Interfaces
{
  public interface IExerciseService
  {
    Task<ExerciseFormView> GetExercise(string exerciseId);
    Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise);
    Task<bool> DeleteExercise(string exerciseId);
    Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType);
    Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType);
    Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType);
    Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType);
  }
}