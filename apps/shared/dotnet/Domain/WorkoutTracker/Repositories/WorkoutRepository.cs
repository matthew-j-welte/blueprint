using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;

namespace BlueprintGym.Domain.WorkoutTracker.Repositories
{
  public class WorkoutRepository : IWorkoutRepository
  {
    private readonly IBaseRepository<Workout> workout;
    private readonly IBaseRepository<WorkoutRef> workoutRef;
    private readonly IBaseRepository<WorkoutEntry> workoutEntry;
    private readonly IBaseRepository<WorkoutEntryRef> workoutEntryRef;

    public WorkoutRepository(
      IBaseRepository<Workout> workout,
      IBaseRepository<WorkoutRef> workoutRef,
      IBaseRepository<WorkoutEntry> workoutEntry,
      IBaseRepository<WorkoutEntryRef> workoutEntryRef
      )
    {
      this.workout = workout;
      this.workoutRef = workoutRef;
      this.workoutEntry = workoutEntry;
      this.workoutSet = workoutSet;
      this.workoutEntryRef = workoutEntryRef;
    }

    public IBaseRepository<Workout> Workout => this.workout;
    public IBaseRepository<WorkoutRef> WorkoutRef => this.workoutRef;
    public IBaseRepository<WorkoutEntry> WorkoutEntry => this.workoutEntry;
    public IBaseRepository<WorkoutEntryRef> workoutEntryRef => this.workoutEntryRef;
  }
}