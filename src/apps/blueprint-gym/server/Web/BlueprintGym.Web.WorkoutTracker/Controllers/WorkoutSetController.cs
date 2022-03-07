using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueprintGym.Web.WorkoutTracker.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WorkoutSetController : ControllerBase
  {
    private readonly IWorkoutSetService workoutEntryService;

    public WorkoutSetController(IWorkoutSetService workoutEntryService)
    {
      this.workoutEntryService = workoutEntryService;
    }

    [HttpGet("get/{workoutEntryId}")]
    public async Task<IEnumerable<WorkoutSetFormView>> GetWorkoutSets(string workoutEntryId)
      => await this.workoutEntryService.GetWorkoutSets(workoutEntryId).ConfigureAwait(false);

    [HttpPut("save")]
    public async Task<WorkoutSetFormView> SaveWorkoutSet(WorkoutSetFormView workoutEntry)
      => await this.workoutEntryService.SaveWorkoutSet(workoutEntry).ConfigureAwait(false);

    [HttpPut("save-all")]
    public async Task<IEnumerable<WorkoutSetFormView>> SaveWorkoutSets(IEnumerable<WorkoutSetFormView> workoutSets)
      => await this.workoutEntryService.SaveWorkoutSets(workoutSets).ConfigureAwait(false);

    [HttpPut("replace-all")]
    public async Task<IEnumerable<WorkoutSetFormView>> ReplaceAllSets(IEnumerable<WorkoutSetFormView> workoutSets)
      => await this.workoutEntryService.ReplaceAllSets(workoutSets).ConfigureAwait(false);

    [HttpDelete("delete-all/{workoutEntryId}")]
    public async Task<int> DeleteWorkoutSets(string workoutEntryId)
      => await this.workoutEntryService.DeleteWorkoutSets(workoutEntryId).ConfigureAwait(false);
  }
}
