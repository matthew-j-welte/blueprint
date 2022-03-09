using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.Models
{
  public class BlobEntity : CosmosEntity, ICosmosEntity
  {
    public string BlobId => this.Id;
    public override string PK => this.BlobId;
    public string FriendlyFileName { get; set; }
    public string Container { get; set; }
    public string BlobPath { get; set; } = string.Empty;
    public string FileType { get; set; }
  }
}