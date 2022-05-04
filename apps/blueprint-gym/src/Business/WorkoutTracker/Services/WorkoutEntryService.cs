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
  public class WorkoutEntryService : IWorkoutEntryService
  {
    private readonly IMapper mapper;
    private readonly WorkoutServiceOptions workoutServiceOptions;
    private readonly IWorkoutRepository workoutRepository;

    public WorkoutEntryService(
      IMapper mapper,
      WorkoutServiceOptions workoutServiceOptions,
      IWorkoutRepository workoutRepository)
    {
      this.mapper = mapper;
      this.workoutServiceOptions = workoutServiceOptions;
      this.workoutRepository = workoutRepository;
    }

    public async Task<bool> DeleteWorkoutEntry(string workoutEntryId)
    {
      await this.workoutRepository.WorkoutEntry.DeleteByIdAsync(workoutEntryId, workoutEntryId).ConfigureAwait(false);
      return true;
    }

    public async Task<IEnumerable<WorkoutEntryLookupDto>> GetWorkoutEntries(string workoutId)
    {
      return this.mapper.Map<IEnumerable<WorkoutEntryLookupDto>>(
        await this.workoutRepository.WorkoutEntryRef
          .GetByQueryAsync(x => x.WorkoutId == workoutId).ConfigureAwait(false));
    }

    public async Task<WorkoutEntryFormView> SaveWorkoutEntry(WorkoutEntryFormView workoutEntry)
    {
      var upsertedWorkoutEntry = await this.workoutRepository.WorkoutEntry.UpsertAsync(
          mapper.Map<WorkoutEntry>(workoutEntry)).ConfigureAwait(false);
      await this.workoutRepository.WorkoutEntryRef.UpsertAsync(
          mapper.Map<WorkoutEntryRef>(workoutEntry)).ConfigureAwait(false);

      return this.mapper.Map<WorkoutEntryFormView>(upsertedWorkoutEntry);
    }
  }
}