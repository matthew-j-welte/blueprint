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
      await this.exerciseRepository.Exercise.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      await this.exerciseRepository.ExerciseRef.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      return true;
    }

    public async Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLink>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLookupDto>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<ExerciseFormView> GetExercise(string exerciseId)
    {
      return this.mapper.Map<ExerciseFormView>(
        await this.exerciseRepository.Exercise.GetByIdAsync(exerciseId).ConfigureAwait(false));
    }

    public async Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise)
    {
      var exerciseEntity = await this.exerciseRepository.Exercise.UpsertAsync(
        mapper.Map<Exercise>(exercise)).ConfigureAwait(false);

      var exerciseRefEntity = await this.exerciseRepository.ExerciseRef.UpsertAsync(
        mapper.Map<ExerciseRef>(exerciseEntity)).ConfigureAwait(false);

      return this.mapper.Map<ExerciseFormView>(exerciseEntity);
    }

    public async Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLink>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLookupDto>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }
  }
}