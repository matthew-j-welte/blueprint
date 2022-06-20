using System;
using System.Collections.Generic;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;

namespace BlueprintGym.Business.ExerciseTracker.Models
{
  public class ExercisePublishRequestDto : BaseEntityModel
  {
    public string ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public string UserId { get; set; }
    public DateTimeOffset TimeSubmitted { get; set; }
    public string AssignedToUserId { get; set; }
    public PublishRequestStatus PublishRequestStatus { get; set; }
    public string StatusJustification { get; set; }
    public IDictionary<string, BeforeAfter> PropertyChanges { get; set; }
  }
}