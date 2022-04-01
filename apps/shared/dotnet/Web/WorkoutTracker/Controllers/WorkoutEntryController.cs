using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueprintGym.Web.WorkoutTracker.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WorkoutEntryController : ControllerBase
  {
    private readonly IWorkoutEntryService workoutEntryService;

    public WorkoutEntryController(IWorkoutEntryService workoutEntryService)
    {
      this.workoutEntryService = workoutEntryService;
    }

    [HttpGet("get/{workoutId}")]
    public async Task<IEnumerable<WorkoutEntryLookupDto>> GetWorkoutEntries(string workoutId)
      => await this.workoutEntryService.GetWorkoutEntries(workoutId).ConfigureAwait(false);

    [HttpPut("save")]
    public async Task<WorkoutEntryFormView> SaveWorkoutEntry(WorkoutEntryFormView workoutEntry)
      => await this.workoutEntryService.SaveWorkoutEntry(workoutEntry).ConfigureAwait(false);

    [HttpDelete("delete/{workoutEntryId}")]
    public async Task<bool> DeleteWorkoutEntry(string workoutEntryId)
      => await this.workoutEntryService.DeleteWorkoutEntry(workoutEntryId).ConfigureAwait(false);
  }
}
