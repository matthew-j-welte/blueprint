using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;

namespace BlueprintGym.Domain.WorkoutTracker.Interfaces
{
  public interface IRegimenRepository
  {
    IBaseRepository<Regimen> Regimen { get; }
  }
}