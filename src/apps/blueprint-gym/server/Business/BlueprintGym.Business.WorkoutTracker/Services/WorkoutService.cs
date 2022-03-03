using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Options;

namespace BlueprintGym.Business.WorkoutTracker.Services
{
  public class WorkoutService : IWorkoutService
  {
    private readonly IMapper mapper;
    private readonly WorkoutServiceOptions workoutServiceOptions;
    private readonly IWorkoutRepository workoutRepository;

    public WorkoutService(
      IMapper mapper,
      WorkoutServiceOptions workoutServiceOptions,
      IWorkoutRepository workoutRepository)
    {
      this.mapper = mapper;
      this.workoutServiceOptions = workoutServiceOptions;
      this.workoutRepository = workoutRepository;
    }

    public async Task<bool> DeleteWorkout(string workoutId)
    {
      await this.workoutRepository.Workout.DeleteByIdAsync(workoutId, workoutId).ConfigureAwait(false);
      await this.workoutRepository.WorkoutRef.DeleteByIdAsync(workoutId, workoutId).ConfigureAwait(false);
      return true;
    }

    public async Task<WorkoutFormView> GetWorkout(string workoutId)
    {
      return this.mapper.Map<WorkoutFormView>(
        await this.workoutRepository.Workout.GetByIdAsync(workoutId).ConfigureAwait(false));
    }

    public async Task<WorkoutFormView> SaveWorkout(WorkoutFormView workout)
    {
      return this.mapper.Map<WorkoutFormView>(
        await this.workoutRepository.Workout.UpsertAsync(
          mapper.Map<Workout>(workout)).ConfigureAwait(false));
    }

    public async Task<IEnumerable<WorkoutLink>> SearchWorkoutLinksByName(string name)
    {
      return mapper.Map<IEnumerable<WorkoutLink>>(
        await this.workoutRepository.Workout.GetAllAsync().ConfigureAwait(false));
    }
  }
}