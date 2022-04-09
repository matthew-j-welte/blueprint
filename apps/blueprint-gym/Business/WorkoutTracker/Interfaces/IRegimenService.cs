using System.Threading.Tasks;
using BlueprintGym.Business.WorkoutTracker.Models;

namespace BlueprintGym.Business.WorkoutTracker.Interfaces
{
  public interface IRegimenService
  {
    Task<RegimenFormView> SaveRegimen(RegimenFormView regimen);
    Task<RegimenFormView> GetRegimen(string regimenId);
    Task<bool> DeleteRegimen(string regimenId);
  }
}