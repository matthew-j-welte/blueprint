using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Business.ExerciseTracker.Interfaces;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;
using BlueprintGym.Domain.ExerciseTracker.Options;

namespace BlueprintGym.Business.ExerciseTracker.Services
{
  public class ExerciseService : IExerciseService
  {
    private readonly IMapper mapper;
    private readonly ExerciseServiceOptions exerciseServiceOptions;
    private readonly IExerciseRepository exerciseRepository;

    public ExerciseService(
      IMapper mapper,
      ExerciseServiceOptions exerciseServiceOptions,
      IExerciseRepository exerciseRepository)
    {
      this.mapper = mapper;
      this.exerciseServiceOptions = exerciseServiceOptions;
      this.exerciseRepository = exerciseRepository;
    }

    public async Task<bool> DeleteExercise(string exerciseId)
    {
      await this.exerciseRepository.Base.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      await this.exerciseRepository.RefBase.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      return true;
    }

    public async Task<ExerciseFormView> GetExercise(string exerciseId)
    {
      return this.mapper.Map<ExerciseFormView>(
        await this.exerciseRepository.Base.GetByIdAsync(exerciseId).ConfigureAwait(false));
    }

    public async Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise)
    {
      return this.mapper.Map<ExerciseFormView>(
        await this.exerciseRepository.Base.UpsertAsync(
          mapper.Map<Exercise>(exercise)).ConfigureAwait(false));
    }

    public async Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLink>>(
        (await this.exerciseRepository.RefBase.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLookupDto>>(
        (await this.exerciseRepository.RefBase.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }
  }
}