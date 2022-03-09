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

    [HttpGet("get/{exerciseId}")]
    public async Task<ExerciseFormView> GetExercise(string exerciseId)
      => await this.exerciseService.GetExercise(exerciseId).ConfigureAwait(false);

    [HttpPut("save")]
    public async Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise)
      => await this.exerciseService.SaveExercise(exercise).ConfigureAwait(false);

    [HttpDelete("delete/{exerciseId}")]
    public async Task<bool> DeleteExercise(string exerciseId)
      => await this.exerciseService.DeleteExercise(exerciseId).ConfigureAwait(false);

    [HttpGet("search/all-links/{searchType}")]
    public async Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType)
      => await this.exerciseService.GetAllExerciseLinks(searchType).ConfigureAwait(false);

    [HttpGet("search/links/{searchType}/{name}")]
    public async Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType)
      => await this.exerciseService.SearchExerciseLinksByName(name, searchType).ConfigureAwait(false);

    [HttpGet("search/all-lookups/{searchType}")]
    public async Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType)
      => await this.exerciseService.GetAllExerciseLookups(searchType).ConfigureAwait(false);

    [HttpGet("search/lookups/{searchType}/{name}")]
    public async Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType)
      => await this.exerciseService.SearchExerciseLookupsByName(name, searchType).ConfigureAwait(false);
  }
}
