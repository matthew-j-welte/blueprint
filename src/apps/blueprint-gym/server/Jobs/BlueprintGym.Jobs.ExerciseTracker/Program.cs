using System;
using System.Linq;
using AutoMapper;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.LocalDatabase;
using BlueprintGym.Domain.Core.LocalMemoryQueue;
using BlueprintGym.Domain.Core.MemoryQueue;
using BlueprintGym.Domain.ExerciseTracker.Options;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;

namespace BlueprintGym.Jobs.ExerciseTracker
{
  public class Program
  {
    public static void Main(string[] args)
    {
      Log.Logger = new LoggerConfiguration()
          .MinimumLevel.Information()
          .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
          .WriteTo.Console()
          .CreateLogger();

      Log.Information($"Starting: ExerciseServiceJob");
      CreateHostBuilder(args).Build().Run();
    }

    public IConfiguration Configuration { get; }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .ConfigureServices((hostContext, services) =>
            {
              IConfiguration configuration = hostContext.Configuration;

              if (args != null && args.Count() > 0)
              {
                foreach (var arg in args)
                {
                  var argParts = arg.Split("=");
                  var k = argParts.First();
                  var v = argParts.Last();
                  Environment.SetEnvironmentVariable(k, v);
                }
              }

              var mapper = new MapperConfiguration(mc =>
              {
                // mc.AddProfile<ExerciseProfile>();
              }).CreateMapper();
              services.AddSingleton<IMapper>(mapper);
              // services.AddOptions<DatabaseInfoOptions>(DatabaseInfoOptions.DatabaseInfo);
              services.AddOptions<ExerciseServiceOptions>(ExerciseServiceOptions.OptionsKey);
              services.AddSingleton<ExerciseServiceOptions>((serviceProvider) =>
              {
                return configuration.GetSection(ExerciseServiceOptions.OptionsKey).Get<ExerciseServiceOptions>();
              });

              var dbOptions = configuration.GetSection(DatabaseInfoOptions.OptionsKey).Get<DatabaseInfoOptions>();
              var startup = new Startup(dbOptions.DatabaseName, dbOptions.DatabaseContainers.ExerciseContainer.Name);

              if (IsLocalDbMode())
              {
                services.AddSingleton<IDatabaseRepositoryFactory, LocalRepositoryFactory>();
                services.AddSingleton<IMemoryQueueFactory, LocalMemoryQueueFactory>();
              }
              else
              {
                services.AddSingleton<CosmosClient>(provider =>
                {
                  return new CosmosClient("");
                });
                services.AddScoped<IDatabaseRepositoryFactory, CosmosRepositoryFactory>();
                services.AddScoped<IMemoryQueueFactory, MemoryQueueFactory>();
              }

              var hasJobKey = int.TryParse(Environment.GetEnvironmentVariable("JOB_KEY"), out var jobKey);
              if (!hasJobKey)
              {
                throw new ArgumentException("Must set JOB_KEY environment variable");
              }

              var bootstrapper = new JobBootstrapper(jobKey, configuration, services, startup);
              var success = bootstrapper.Bootstrap();

              if (!success)
              {
                throw new SystemException("Failed to bootstrap job. Ensure JOB_KEY environment variable is valid");
              }
            });

    private static bool IsLocalDbMode()
    {
      return true;
    }
  }
}
