using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;
using ExerciseTracker.Models;

namespace BlueprintGym.Domain.ExerciseTracker.Repositories
{
  public class ExerciseRepository : IExerciseRepository
  {
    private readonly IBaseRepository<Exercise> baseRepository;
    private readonly IBaseRepository<ExerciseRef> baseRefRepository;
    private readonly IBaseRepository<ExercisePublishRequestRef> basePublishRequestRefRepository;

    public ExerciseRepository(
      IBaseRepository<Exercise> baseRepository,
      IBaseRepository<ExerciseRef> baseRefRepository,
      IBaseRepository<ExercisePublishRequestRef> basePublishRequestRefRepository)
    {
      this.baseRepository = baseRepository;
      this.baseRefRepository = baseRefRepository;
      this.basePublishRequestRefRepository = basePublishRequestRefRepository;
    }

    public IBaseRepository<Exercise> Exercise => this.baseRepository;
    public IBaseRepository<ExerciseRef> ExerciseRef => this.baseRefRepository;
    public IBaseRepository<ExercisePublishRequestRef> ExercisePublishRequestRef => this.basePublishRequestRefRepository;
  }
}