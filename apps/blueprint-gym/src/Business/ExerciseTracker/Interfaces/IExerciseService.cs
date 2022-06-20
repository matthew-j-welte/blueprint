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
    ExerciseFormView GetNewExercise();
    Task<ExerciseFormView> GetExercise(string exerciseId);
    Task<ExercisePrePublishFormView> GetExerciseForPrePublish(string exerciseId);
    Task<ExercisePublishFormView> GetExerciseForPublish(string exerciseId);
    Task<IEnumerable<ExercisePublishRequestDto>> GetMyPublishRequests(string userId);
    Task<IEnumerable<ExercisePublishRequestDto>> GetPublishRequestsForAdminReview(string userId);
    Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise);
    Task<ExercisePrePublishFormView> PrePublishExercise(ExercisePrePublishFormView exercise);
    Task<bool> DeleteExercise(string exerciseId);
    Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType);
    Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType);
    Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType);
    Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType);
  }
}