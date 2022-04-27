using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Domain.WorkoutTracker.Models
{
  public class WorkoutEntry : CosmosEntity, ICosmosEntity
  {
    public override string PK => this.WorkoutEntryId;
    public string WorkoutEntryId => Keys.WorkoutEntry(this.WorkoutIndex, this.WorkoutId);
    public string WorkoutId { get; set; }
    public string RegimenId { get; set; }
    public int WorkoutIndex { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public IEnumerable<WorkoutSetEntry> WorkoutSetEntries { get; set; }
  }
}