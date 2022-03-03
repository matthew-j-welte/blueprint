using System;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface ICosmosEntity
  {

    string Id { get; set; }
    string Type { get; }
    PartitionKey PK { get; }
    DateTimeOffset ModifiedOn { get; set; }
  }
}