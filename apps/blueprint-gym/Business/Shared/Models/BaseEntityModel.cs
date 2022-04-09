using System;

namespace BlueprintGym.Business.Shared.Models
{
  public class BaseEntityModel
  {
    private string id = Guid.NewGuid().ToString().ToLowerInvariant();
    public string Id
    {
      get
      {
        id = id?.ToLowerInvariant() ?? Guid.NewGuid().ToString().ToLowerInvariant();
        return id;
      }
      set => id = value?.ToLowerInvariant() ?? Guid.NewGuid().ToString().ToLowerInvariant();
    }
    public DateTimeOffset? ModifiedOn { get; set; }
  }
}