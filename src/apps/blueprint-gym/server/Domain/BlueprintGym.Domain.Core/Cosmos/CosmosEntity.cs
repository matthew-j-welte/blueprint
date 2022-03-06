using System;
using BlueprintGym.Domain.Core.Interfaces;
using Newtonsoft.Json;

namespace BlueprintGym.Domain.Core.Cosmos
{
  public abstract class CosmosEntity : ICosmosEntity
  {
    [JsonProperty(PropertyName = "id")]
    public virtual string Id { get; set; } = Guid.NewGuid().ToString();
    public virtual string Type => this.GetType().Name;
    public abstract string PK { get; }
    public DateTimeOffset ModifiedOn { get; set; } = DateTimeOffset.UtcNow;
  }
}