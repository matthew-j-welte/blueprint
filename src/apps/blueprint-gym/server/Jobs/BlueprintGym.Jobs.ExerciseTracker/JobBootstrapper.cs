using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;
using BlueprintGym.Domain.ExerciseTracker.Repositories;
using BlueprintGym.Jobs.ExerciseTracker.CronJobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlueprintGym.Jobs.ExerciseTracker
{
  public class JobBootstrapper
  {
    private readonly int jobKey;
    private readonly IConfiguration configuration;
    private readonly IServiceCollection services;
    private readonly Startup startup;

    public JobBootstrapper(int jobKey, IConfiguration configuration, IServiceCollection services, Startup startup)
    {
      this.jobKey = jobKey;
      this.configuration = configuration;
      this.services = services;
      this.startup = startup;
    }

    public bool Bootstrap()
    {
      return jobKey switch
      {
        1 => this.BootstrapExerciseCompletionJob(),
        2 => this.BootstrapExerciseKickoffJob(),
        _ => false
      };
    }

    private bool BootstrapExerciseCompletionJob()
    {
      startup.ConfigureRepository<IExerciseRepository, ExerciseRepository, Exercise>(services);
      // startup.ConfigureRepository<IExerciseLeaderboardRepository, ExerciseLeaderboardRepository, ExerciseLeaderboard>(services);

      // services.AddSingleton<IExerciseWorkflowService, ExerciseWorkflowService>();
      services.AddHostedService<ExerciseCompletionCronJob>();
      return true;
    }

    private bool BootstrapExerciseKickoffJob()
    {
      startup.ConfigureRepository<IExerciseRepository, ExerciseRepository, Exercise>(services);
      // startup.ConfigureRepository<IExerciseLeaderboardRepository, ExerciseLeaderboardRepository, ExerciseLeaderboard>(services);

      // services.AddSingleton<IExerciseWorkflowService, ExerciseWorkflowService>();
      services.AddHostedService<ExerciseKickoffCronJob>();
      return true;
    }
  }
}