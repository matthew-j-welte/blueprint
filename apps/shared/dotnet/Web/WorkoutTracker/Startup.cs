using AutoMapper;
using BlueprintGym.Business.WorkoutTracker.Interfaces;
using BlueprintGym.Business.WorkoutTracker.Mappings;
using BlueprintGym.Business.WorkoutTracker.Services;
using BlueprintGym.Domain.WorkoutTracker.Interfaces;
using BlueprintGym.Domain.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Options;
using BlueprintGym.Domain.WorkoutTracker.Repositories;
using BlueprintGym.Infrastructure.Web.Startup;
using BlueprintGym.Integration.Blob;
using BlueprintGym.Integration.Contracts.Blob;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlueprintGym.Web.WorkoutTracker
{
  public class Startup
  {
    private readonly ApiStartupService apiStartupSvc;
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
      apiStartupSvc = new ApiStartupService(configuration, "WorkoutService");
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services = this.apiStartupSvc.PreConfigureServices(services);

      var mapper = new MapperConfiguration(mc =>
      {
        mc.AddProfile<WorkoutProfile>();
      }).CreateMapper();
      services.AddSingleton<IMapper>(mapper);

      services.AddOptions<DatabaseInfoOptions>(DatabaseInfoOptions.OptionsKey);
      services.AddOptions<WorkoutServiceOptions>(WorkoutServiceOptions.OptionsKey);
      services.AddSingleton<WorkoutServiceOptions>(
        Configuration.GetSection(WorkoutServiceOptions.OptionsKey).Get<WorkoutServiceOptions>());
      var workoutServiceOptions = Configuration.GetSection(WorkoutServiceOptions.OptionsKey).Get<WorkoutServiceOptions>();
      var dbOptions = Configuration.GetSection(DatabaseInfoOptions.OptionsKey).Get<DatabaseInfoOptions>();

      this.apiStartupSvc.SetDatabaseName(dbOptions.DatabaseName);
      this.apiStartupSvc.SetContainerName(dbOptions.DatabaseContainers.WorkoutContainer.Name);

      this.apiStartupSvc.ConfigureRepository<IWorkoutRepository, WorkoutRepository, Workout, WorkoutRef, WorkoutEntry, WorkoutSet>(services);
      this.apiStartupSvc.ConfigureRepository<IRegimenRepository, RegimenRepository, Regimen>(services);

      var isLocalDbMode = this.apiStartupSvc.IsLocalDbMode();
      if (isLocalDbMode)
      {
        services.AddScoped<IBlobService, LocalBlobService>();
      }
      else
      {
        services.AddScoped<IBlobService, BlobService>();

      }

      services.AddScoped<IWorkoutService, WorkoutService>();
      services.AddScoped<IWorkoutEntryService, WorkoutEntryService>();
      services.AddScoped<IWorkoutSetService, WorkoutSetService>();
      services.AddScoped<IRegimenService, RegimenService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app = this.apiStartupSvc.PreConfigureApp(app, env);
    }
  }
}
