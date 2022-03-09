using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IBlobRepository
  {
    IBaseRepository<BlobEntity> Base { get; }
  }
}