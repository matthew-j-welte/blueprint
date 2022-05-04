using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Options;

namespace BlueprintGym.Business.WorkoutTracker.Services
{
  public class RegimenService : IRegimenService
  {
    private readonly IMapper mapper;
    private readonly WorkoutServiceOptions workoutServiceOptions;
    private readonly IRegimenRepository regimenRepository;

    public RegimenService(
      IMapper mapper,
      WorkoutServiceOptions workoutServiceOptions,
      Domain.WorkoutTracker.Interfaces.IRegimenRepository regimenRepository)
    {
      this.mapper = mapper;
      this.workoutServiceOptions = workoutServiceOptions;
      this.regimenRepository = regimenRepository;
    }

    public async Task<bool> DeleteRegimen(string workoutId)
    {
      await this.regimenRepository.Regimen.DeleteByIdAsync(workoutId, workoutId).ConfigureAwait(false);
      return true;
    }

    public async Task<RegimenFormView> GetRegimen(string workoutId)
    {
      return this.mapper.Map<RegimenFormView>(
        await this.regimenRepository.Regimen.GetByIdAsync(workoutId).ConfigureAwait(false));
    }

    public async Task<RegimenFormView> SaveRegimen(RegimenFormView workout)
    {
      return this.mapper.Map<RegimenFormView>(
        await this.regimenRepository.Regimen.UpsertAsync(
          mapper.Map<Regimen>(workout)).ConfigureAwait(false));
    }
  }
}