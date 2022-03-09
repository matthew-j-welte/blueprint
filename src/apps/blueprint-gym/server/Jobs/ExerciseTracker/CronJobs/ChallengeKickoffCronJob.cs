using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BlueprintGym.Jobs.ExerciseTracker.CronJobs
{
  public class ExerciseKickoffCronJob : BackgroundService
  {
    private readonly ILogger<ExerciseKickoffCronJob> logger;
    private readonly IHostApplicationLifetime hostApplicationLifetime;

    public ExerciseKickoffCronJob(
      ILogger<ExerciseKickoffCronJob> logger,
      IHostApplicationLifetime hostApplicationLifetime)
    {
      this.logger = logger;
      this.hostApplicationLifetime = hostApplicationLifetime;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      // TODO: put this somewhere common
      // TODO: Add some default logging about which job is being executed
      try
      {

      }
      finally
      {
        logger.LogInformation("Worker terminating at: {now}", DateTimeOffset.UtcNow);
        hostApplicationLifetime.StopApplication();
      }
    }
  }
}