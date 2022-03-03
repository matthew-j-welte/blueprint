using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;

namespace BlueprintGym.Domain.WorkoutTracker.Repositories
{
  public class RegimenRepository : IRegimenRepository
  {
    private readonly IBaseRepository<Regimen> baseRepository;

    public RegimenRepository(IBaseRepository<Regimen> baseRepository)
    {
      this.baseRepository = baseRepository;
    }

    public IBaseRepository<Regimen> Base => this.baseRepository;
  }
}