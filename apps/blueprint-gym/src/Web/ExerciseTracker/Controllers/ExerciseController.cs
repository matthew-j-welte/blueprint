using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.ExerciseTracker.Interfaces;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueprintGym.Web.ExerciseTracker.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ExerciseController : ControllerBase
  {
    private readonly IExerciseService exerciseService;

    public ExerciseController(IExerciseService exerciseService)
    {
      this.exerciseService = exerciseService;
    }

    // TODO: Eventually this may accept a dictionary of "initParams"
    [HttpGet("new")]
    public ExerciseFormView GetNewExercise() => this.exerciseService.GetNewExercise();

    [HttpGet("get/{exerciseId}")]
    public async Task<ExerciseFormView> GetExercise(string exerciseId)
      => await this.exerciseService.GetExercise(exerciseId).ConfigureAwait(false);

    [HttpGet("pre-publish/get/{exerciseId}")]
    public async Task<ExercisePrePublishFormView> GetExerciseForPrePublish(string exerciseId)
      => await this.exerciseService.GetExerciseForPrePublish(exerciseId).ConfigureAwait(false);

    [HttpGet("publish/get/{exerciseId}")]
    public async Task<ExerciseFormView> GetExerciseForPublish(string exerciseId)
      => await this.exerciseService.GetExerciseForPublish(exerciseId).ConfigureAwait(false);

    [HttpGet("publish-requests/{userId}")]
    public async Task<IEnumerable<ExercisePublishRequestDto>> GetMyPublishRequests(string userId)
      => await this.exerciseService.GetMyPublishRequests(userId).ConfigureAwait(false);

    [HttpGet("admin-publish-requests/{userId}")]
    public async Task<IEnumerable<ExercisePublishRequestDto>> GetPublishRequestsForAdminReview(string userId)
      => await this.exerciseService.GetPublishRequestsForAdminReview(userId).ConfigureAwait(false);

    [HttpGet("search/all-links/{searchType}")]
    public async Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType)
      => await this.exerciseService.GetAllExerciseLinks(searchType).ConfigureAwait(false);

    [HttpGet("search/links/{searchType}/{name}")]
    public async Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(ExerciseState searchType, string name)
      => await this.exerciseService.SearchExerciseLinksByName(name, searchType).ConfigureAwait(false);

    [HttpGet("search/all-lookups/{searchType}")]
    public async Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType)
      => await this.exerciseService.GetAllExerciseLookups(searchType).ConfigureAwait(false);

    [HttpGet("search/lookups/{searchType}/{name}")]
    public async Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType)
      => await this.exerciseService.SearchExerciseLookupsByName(name, searchType).ConfigureAwait(false);

    [HttpPost("new")]
    public async Task<ExerciseFormView> SaveNewExercise(ExerciseFormView exercise) =>
      await this.exerciseService.SaveExercise(exercise).ConfigureAwait(false);

    [HttpPut("save")]
    public async Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise)
      => await this.exerciseService.SaveExercise(exercise).ConfigureAwait(false);

    [HttpPut("pre-publish")]
    public async Task<ExercisePrePublishFormView> PrePublishExercise(ExercisePrePublishFormView exercise)
      => await this.exerciseService.PrePublishExercise(exercise).ConfigureAwait(false);

    [HttpDelete("delete/{exerciseId}")]
    public async Task<bool> DeleteExercise(string exerciseId)
      => await this.exerciseService.DeleteExercise(exerciseId).ConfigureAwait(false);
  }
}
