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
    private readonly IBaseRepository<WorkoutSet> workoutSet;

    public WorkoutRepository(
      IBaseRepository<Workout> workout,
      IBaseRepository<WorkoutRef> workoutRef,
      IBaseRepository<WorkoutEntry> workoutEntry,
      IBaseRepository<WorkoutSet> workoutSet
      )
    {
      this.workout = workout;
      this.workoutRef = workoutRef;
      this.workoutEntry = workoutEntry;
      this.workoutSet = workoutSet;
    }

    public IBaseRepository<Workout> Workout => this.workout;
    public IBaseRepository<WorkoutRef> WorkoutRef => this.workoutRef;
    public IBaseRepository<WorkoutEntry> WorkoutEntry => this.workoutEntry;
    public IBaseRepository<WorkoutSet> WorkoutSet => this.workoutSet;
  }
}