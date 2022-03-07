using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BlueprintGym.Jobs.ExerciseTracker.CronJobs
{
  public class ExerciseCompletionCronJob : BackgroundService
  {
    private readonly ILogger<ExerciseCompletionCronJob> logger;
    private readonly IHostApplicationLifetime hostApplicationLifetime;

    public ExerciseCompletionCronJob(
      ILogger<ExerciseCompletionCronJob> logger,
      IHostApplicationLifetime hostApplicationLifetime)
    {
      this.logger = logger;
      this.hostApplicationLifetime = hostApplicationLifetime;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
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