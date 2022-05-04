using AutoMapper;
using BlueprintGym.Business.ExerciseTracker.Interfaces;
using BlueprintGym.Business.ExerciseTracker.Mappings;
using BlueprintGym.Business.ExerciseTracker.Services;
using BlueprintGym.Domain.ExerciseTracker.Interfaces;
using BlueprintGym.Domain.ExerciseTracker.Models;
using BlueprintGym.Domain.ExerciseTracker.Options;
using BlueprintGym.Domain.ExerciseTracker.Repositories;
using BlueprintGym.Infrastructure.Web.Startup;
using BlueprintGym.Integration.Blob;
using BlueprintGym.Integration.Contracts.Blob;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlueprintGym.Web.ExerciseTracker
{
  public class Startup
  {
    private readonly ApiStartupService apiStartupSvc;
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
      apiStartupSvc = new ApiStartupService(configuration, "ExerciseService");
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services = this.apiStartupSvc.PreConfigureServices(services);

      var mapper = new MapperConfiguration(mc =>
      {
        mc.AddProfile<ExerciseProfile>();
      }).CreateMapper();
      services.AddSingleton<IMapper>(mapper);

      services.AddOptions<DatabaseInfoOptions>(DatabaseInfoOptions.OptionsKey);
      services.AddOptions<ExerciseServiceOptions>(ExerciseServiceOptions.OptionsKey);
      services.AddSingleton<ExerciseServiceOptions>(
        Configuration.GetSection(ExerciseServiceOptions.OptionsKey).Get<ExerciseServiceOptions>());
      var exerciseServiceOptions = Configuration.GetSection(ExerciseServiceOptions.OptionsKey).Get<ExerciseServiceOptions>();
      var dbOptions = Configuration.GetSection(DatabaseInfoOptions.OptionsKey).Get<DatabaseInfoOptions>();

      this.apiStartupSvc.SetDatabaseName(dbOptions.DatabaseName);
      this.apiStartupSvc.SetContainerName(dbOptions.DatabaseContainers.ExerciseContainer.Name);

      this.apiStartupSvc.ConfigureRepository<IExerciseRepository, ExerciseRepository, Exercise, ExerciseRef>(services);

      var isLocalDbMode = this.apiStartupSvc.IsLocalDbMode();
      if (isLocalDbMode)
      {
        services.AddScoped<IBlobService, LocalBlobService>();
      }
      else
      {
        services.AddScoped<IBlobService, BlobService>();

      }

      services.AddScoped<IExerciseService, ExerciseService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app = this.apiStartupSvc.PreConfigureApp(app, env);
    }
  }
}
