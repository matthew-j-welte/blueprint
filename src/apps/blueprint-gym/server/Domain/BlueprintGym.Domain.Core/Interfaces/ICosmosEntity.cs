using System;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface ICosmosEntity
  {

    string Id { get; set; }
    string Type { get; }
    string PK { get; }
    DateTimeOffset ModifiedOn { get; set; }
  }
}