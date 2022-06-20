using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Business.ExerciseTracker.Interfaces;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Constants.Enums;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;
using BlueprintGym.Domain.ExerciseTracker.Options;
using Constants.Lookups;
using ExerciseTracker.Models;

namespace BlueprintGym.Business.ExerciseTracker.Services
{
  public class ExerciseService : IExerciseService
  {
    private readonly IMapper mapper;
    private readonly ExerciseServiceOptions exerciseServiceOptions;
    private readonly IExerciseRepository exerciseRepository;

    public ExerciseService(
      IMapper mapper,
      ExerciseServiceOptions exerciseServiceOptions,
      IExerciseRepository exerciseRepository)
    {
      this.mapper = mapper;
      this.exerciseServiceOptions = exerciseServiceOptions;
      this.exerciseRepository = exerciseRepository;
    }

    public ExerciseFormView GetNewExercise()
    {
      var newExercise = new ExerciseFormView { };
      newExercise.ExerciseId = newExercise.Id;
      return newExercise;
    }

    public async Task<ExerciseFormView> GetExercise(string exerciseId)
    {
      return this.mapper.Map<ExerciseFormView>(
        await this.exerciseRepository.Exercise.GetByIdAsync(exerciseId).ConfigureAwait(false));
    }

    public async Task<ExercisePrePublishFormView> GetExerciseForPrePublish(string exerciseId)
    {
      var exercise = mapper.Map<ExercisePrePublishFormView>(
        await this.GetExercise(exerciseId).ConfigureAwait(false));
      if (exercise.MuscleSpecificity == MuscleSpecificity.Basic)
      {
        exercise.MusclesWorked = exercise.MusclesWorked
          .SelectMany(x => MuscleGroupLookups.BasicGroupingToTrainerGroupingLookup[x]);
      }
      else if (exercise.MuscleSpecificity == MuscleSpecificity.Focused)
      {
        // TODO: Update after assigning trainer level muscles        
      }
      exercise.PreviousMuscleSpecificity = exercise.MuscleSpecificity;
      exercise.MuscleSpecificity = MuscleSpecificity.Trainer;
      return exercise;
    }

    public async Task<ExercisePublishFormView> GetExerciseForPublish(string exerciseId)
    {
      var exercise = await this.exerciseRepository.Exercise.GetByIdAsync(exerciseId).ConfigureAwait(false);
      var publishRequestRef = mapper.Map<ExercisePublishRequestRef>(exercise);

      publishRequestRef.PublishRequestStatus = PublishRequestStatus.InReview;
      publishRequestRef.TimeSubmitted = DateTimeOffset.UtcNow;
      publishRequestRef.AssignedToUserId = "1";

      await this.exerciseRepository.ExercisePublishRequestRef.UpsertAsync(
        publishRequestRef).ConfigureAwait(false);

      return mapper.Map<ExercisePublishFormView>(exercise);
    }

    public async Task<bool> DeleteExercise(string exerciseId)
    {
      await this.exerciseRepository.Exercise.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      await this.exerciseRepository.ExerciseRef.DeleteByIdAsync(exerciseId, exerciseId).ConfigureAwait(false);
      return true;
    }

    public async Task<IEnumerable<ExerciseLink>> GetAllExerciseLinks(ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLink>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<IEnumerable<ExerciseLookupDto>> GetAllExerciseLookups(ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLookupDto>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<ExerciseFormView> SaveExercise(ExerciseFormView exercise)
    {
      var exerciseEntity = await this.exerciseRepository.Exercise.UpsertAsync(
        mapper.Map<Exercise>(exercise)).ConfigureAwait(false);

      var exerciseRefEntity = await this.exerciseRepository.ExerciseRef.UpsertAsync(
        mapper.Map<ExerciseRef>(exerciseEntity)).ConfigureAwait(false);

      return this.mapper.Map<ExerciseFormView>(exerciseEntity);
    }

    public async Task<IEnumerable<ExerciseLink>> SearchExerciseLinksByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLink>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<IEnumerable<ExerciseLookupDto>> SearchExerciseLookupsByName(string name, ExerciseState searchType)
    {
      return mapper.Map<IEnumerable<ExerciseLookupDto>>(
        (await this.exerciseRepository.ExerciseRef.GetAllAsync().ConfigureAwait(false))
          .Where(x => x.State == searchType));
    }

    public async Task<ExercisePrePublishFormView> PrePublishExercise(ExercisePrePublishFormView exercise)
    {
      // TODO: Validate muscles are all trainer level and valid (user could un-disable the buttons)

      var upsertedExercise = await this.exerciseRepository.Exercise.UpsertAsync(
        mapper.Map<Exercise>(exercise)).ConfigureAwait(false);

      var publishRequestRef = mapper.Map<ExercisePublishRequestRef>(exercise);
      publishRequestRef.TimeSubmitted = DateTimeOffset.UtcNow;

      await this.exerciseRepository.ExercisePublishRequestRef.UpsertAsync(
        publishRequestRef).ConfigureAwait(false);

      return exercise;
    }

    public async Task<IEnumerable<ExercisePublishRequestDto>> GetMyPublishRequests(string userId)
    {
      return mapper.Map<IEnumerable<ExercisePublishRequestDto>>(
        await this.exerciseRepository.ExercisePublishRequestRef.GetByQueryAsync(
          x => x.PK == "ExercisePublishRequestRef" && x.UserId == userId).ConfigureAwait(false));
    }

    public async Task<IEnumerable<ExercisePublishRequestDto>> GetPublishRequestsForAdminReview(string userId)
    {
      return mapper.Map<IEnumerable<ExercisePublishRequestDto>>(
        await this.exerciseRepository.ExercisePublishRequestRef.GetByQueryAsync(
          x =>
            x.PK == "ExercisePublishRequestRef"
            && (x.PublishRequestStatus == PublishRequestStatus.NotStarted
              || (x.PublishRequestStatus == PublishRequestStatus.InReview
                && x.AssignedToUserId.Equals(userId)))).ConfigureAwait(false));
    }
  }
}