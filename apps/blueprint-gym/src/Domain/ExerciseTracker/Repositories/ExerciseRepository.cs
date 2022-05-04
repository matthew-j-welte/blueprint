using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;

namespace BlueprintGym.Domain.ExerciseTracker.Repositories
{
  public class ExerciseRepository : IExerciseRepository
  {
    private readonly IBaseRepository<Exercise> baseRepository;
    private readonly IBaseRepository<ExerciseRef> baseRefRepository;

    public ExerciseRepository(IBaseRepository<Exercise> baseRepository, IBaseRepository<ExerciseRef> baseRefRepository)
    {
      this.baseRepository = baseRepository;
      this.baseRefRepository = baseRefRepository;
    }

    public IBaseRepository<Exercise> Exercise => this.baseRepository;
    public IBaseRepository<ExerciseRef> ExerciseRef => this.baseRefRepository;
  }
}