using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Options;

namespace BlueprintGym.Business.WorkoutTracker.Services
{
  public class WorkoutSetService : IWorkoutSetService
  {
    private readonly IMapper mapper;
    private readonly WorkoutServiceOptions workoutServiceOptions;
    private readonly IWorkoutRepository workoutRepository;

    public WorkoutSetService(
      IMapper mapper,
      WorkoutServiceOptions workoutServiceOptions,
      IWorkoutRepository workoutRepository)
    {
      this.mapper = mapper;
      this.workoutServiceOptions = workoutServiceOptions;
      this.workoutRepository = workoutRepository;
    }

    public async Task<int> DeleteWorkoutSets(string workoutEntryId)
    {
      var deletionTasks = (await this.workoutRepository.WorkoutSet
        .GetByQueryAsync(x => x.WorkoutEntryId == workoutEntryId).ConfigureAwait(false))
          .Select(x => this.workoutRepository.WorkoutSet.DeleteByIdAsync(x.Id, x.PK.ToString()));
      await Task.WhenAll(deletionTasks).ConfigureAwait(false);
      return deletionTasks.Count();
    }

    public async Task<IEnumerable<WorkoutSetFormView>> GetWorkoutSets(string workoutEntryId)
    {
      return this.mapper.Map<IEnumerable<WorkoutSetFormView>>(
        await this.workoutRepository.WorkoutSet
          .GetByQueryAsync(x => x.WorkoutEntryId == workoutEntryId).ConfigureAwait(false));
    }

    public async Task<IEnumerable<WorkoutSetFormView>> ReplaceAllSets(IEnumerable<WorkoutSetFormView> workoutSets)
    {
      await this.DeleteWorkoutSets(workoutSets.First().WorkoutEntryId).ConfigureAwait(false);
      return await this.SaveWorkoutSets(workoutSets).ConfigureAwait(false);
    }

    public async Task<WorkoutSetFormView> SaveWorkoutSet(WorkoutSetFormView workoutSet)
    {
      return this.mapper.Map<WorkoutSetFormView>(
        await this.workoutRepository.WorkoutSet.UpsertAsync(
          mapper.Map<WorkoutSet>(workoutSet)).ConfigureAwait(false));
    }

    public async Task<IEnumerable<WorkoutSetFormView>> SaveWorkoutSets(IEnumerable<WorkoutSetFormView> workoutSets)
    {
      return await this.mapper.Map<IEnumerable<WorkoutSetFormView>>(
        await this.workoutRepository.WorkoutSet.AddAsync(
          mapper.Map<IEnumerable<WorkoutSet>>(workoutSets)
      ));
    }
  }
}