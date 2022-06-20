using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;

namespace ExerciseTracker.Models
{
  public class ExercisePublishRequestRef : CosmosEntity, ICosmosEntity
  {
    public override string PK => $"{this.GetType().Name}";
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string UserId { get; set; } = "1";
    public DateTimeOffset TimeSubmitted { get; set; } = DateTimeOffset.UtcNow;
    public string AssignedToUserId { get; set; }
    public PublishRequestStatus PublishRequestStatus { get; set; }
    public string StatusJustification { get; set; }
    public IDictionary<string, BeforeAfter> PropertyChanges { get; set; }
  }
}
