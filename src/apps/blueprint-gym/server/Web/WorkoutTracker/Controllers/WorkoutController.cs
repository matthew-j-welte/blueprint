using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueprintGym.Web.WorkoutTracker.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WorkoutController : ControllerBase
  {
    private readonly IWorkoutService workoutService;

    public WorkoutController(IWorkoutService workoutService)
    {
      this.workoutService = workoutService;
    }

    [HttpGet("get/{workoutId}")]
    public async Task<WorkoutFormView> GetWorkout(string workoutId)
      => await this.workoutService.GetWorkout(workoutId).ConfigureAwait(false);

    [HttpPut("save")]
    public async Task<WorkoutFormView> SaveWorkout(WorkoutFormView workout)
      => await this.workoutService.SaveWorkout(workout).ConfigureAwait(false);

    [HttpDelete("delete/{workoutId}")]
    public async Task<bool> DeleteWorkout(string workoutId)
      => await this.workoutService.DeleteWorkout(workoutId).ConfigureAwait(false);

    [HttpGet("search/links/{name}")]
    public async Task<IEnumerable<WorkoutLink>> SearchWorkoutLinksByName(string name)
      => await this.workoutService.SearchWorkoutLinksByName(name).ConfigureAwait(false);

    [HttpGet("search/lookups/{name}")]
    public async Task<IEnumerable<WorkoutLookupDto>> SearchWorkoutLookupsByName(string name)
      => await this.workoutService.SearchWorkoutLookupsByName(name).ConfigureAwait(false);

    [HttpGet("search/all-links")]
    public async Task<IEnumerable<WorkoutLink>> GatAllWorkoutLinks()
      => await this.workoutService.GatAllWorkoutLinks().ConfigureAwait(false);

    [HttpGet("search/all-lookups")]
    public async Task<IEnumerable<WorkoutLookupDto>> GatAllWorkoutLookups()
      => await this.workoutService.GatAllWorkoutLookups().ConfigureAwait(false);
  }
}
