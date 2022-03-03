using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueprintGym.Web.WorkoutTracker.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class RegimenController : ControllerBase
  {
    private readonly IRegimenService regimenService;

    public RegimenController(IRegimenService regimenService)
    {
      this.regimenService = regimenService;
    }

    [HttpGet("{regimenId}")]
    public async Task<RegimenFormView> GetRegimen(string regimenId)
      => await this.regimenService.GetRegimen(regimenId).ConfigureAwait(false);

    [HttpPut]
    public async Task<RegimenFormView> SaveRegimen(RegimenFormView regimen)
      => await this.regimenService.SaveRegimen(regimen).ConfigureAwait(false);

    [HttpDelete("{regimenId}")]
    public async Task<bool> DeleteRegimen(string regimenId)
      => await this.regimenService.DeleteRegimen(regimenId).ConfigureAwait(false);
  }
}
