using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;

namespace WorkoutTracker.Models
{
  public class RegimenLookupDto : BaseEntityModel
  {
    public string RegimenId { get; set; }
    public string RegimenName { get; set; }
    public FitnessDifficulty Difficulty { get; set; }
    public MuscleSpecificity MuscleSpecificity { get; set; }
  }
}