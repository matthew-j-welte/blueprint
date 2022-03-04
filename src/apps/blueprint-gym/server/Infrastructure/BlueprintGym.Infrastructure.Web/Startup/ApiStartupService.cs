using System;
using BlueprintGym.Domain.Core;
using BlueprintGym.Domain.Core.Cosmos;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.LocalDatabase;
using BlueprintGym.Domain.Core.LocalMemoryQueue;
using BlueprintGym.Domain.Core.MemoryQueue;
using BlueprintGym.Domain.Core.Repositories;
using BlueprintGym.Infrastructure.Web.Converters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;

namespace BlueprintGym.Infrastructure.Web.Startup
{
  public class ApiStartupService
  {
    private IConfiguration configuration { get; }
    private readonly string apiName;
    private string dbName;
    private string containerName;

    public ApiStartupService(IConfiguration configuration, string apiName)
    {
      this.configuration = configuration;
      this.apiName = apiName;
    }

    public static int RunHost(Func<string[], IHostBuilder> createHostBuilder, string[] args, string apiFriendlyName)
    {
      Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
        .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
        .WriteTo.Console()
        .CreateLogger();

      Log.Information($"Starting: {apiFriendlyName}");

      try
      {
        createHostBuilder(args).Build().Run();
        Log.Information($"Cleanly Stopped: {apiFriendlyName}");
        return 0;
      }
      catch (Exception ex)
      {
        Log.Fatal(ex, $"Failed to Start: {apiFriendlyName}");
        return 1;
      }
      finally
      {
        Log.CloseAndFlush();
      }
    }

    public IServiceCollection PreConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy(name: "policy", builder => builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
      });

      services.AddControllers();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = apiName, Version = "v1" });
      });

      services.AddResponseCompression(options =>
      {
        options.Providers.Add<BrotliCompressionProvider>();
        options.Providers.Add<GzipCompressionProvider>();
      });

      var isLocalDbMode = IsLocalDbMode();

      services.AddScoped<MemberRequestContext>();

      // Might have to separate this depending on API type, but fine for now
      if (isLocalDbMode)
      {
        services.AddScoped<IDatabaseRepositoryFactory, LocalRepositoryFactory>();
        services.AddScoped<IMemoryQueueFactory, LocalMemoryQueueFactory>();
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
      services.AddMvc().AddJsonOptions(options =>
      {
        options.JsonSerializerOptions.Converters.Add(new DateTimeOffsetConverter());
      });
      services.AddHealthChecks();
      return services;
    }

    public IApplicationBuilder PreConfigureApp(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", apiName));
      }

      app.UseSerilogRequestLogging();
      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseCors("policy");

      app.UseResponseCompression();

      var cachingDisabledEnv = Environment.GetEnvironmentVariable("CACHING_DISABLED");
      var cachingDisabled = cachingDisabledEnv?.ToLower().Equals("true") == true;
      if (!cachingDisabled)
      {
        app.UseResponseCaching();
        app.Use(async (context, next) =>
        {
          context.Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue()
          {
            Public = true,
            MaxAge = TimeSpan.FromSeconds(10)
          };
          context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] = new string[] { "Accept-Encoding" };
          await next();
        });
      }

      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGet("/", async context =>
        {
          await context.Response.WriteAsync("PING");
        });
        endpoints.MapControllers();
      });
      return app;
    }

    public void ConfigureRepository<T1, T2, T3>(IServiceCollection services)
      where T1 : class
      where T3 : ICosmosEntity
    {
      services.AddScoped<T1>(provider =>
      {
        return Activator.CreateInstance(typeof(T2), new object[]
        { new BaseRepository<T3>(provider.GetService<IDatabaseRepositoryFactory>(),
          this.dbName,
          this.containerName)
        }) as T1;
      });
    }

    public void ConfigureRepository<T1, T2, T3, T4>(IServiceCollection services)
      where T1 : class
      where T3 : ICosmosEntity
      where T4 : ICosmosEntity
    {
      services.AddScoped<T1>(provider =>
      {
        return Activator.CreateInstance(typeof(T2), new object[]
        {
          new BaseRepository<T3>(
            provider.GetService<IDatabaseRepositoryFactory>(),
            this.dbName,
            this.containerName),
          new BaseRepository<T4>(
            provider.GetService<IDatabaseRepositoryFactory>(),
            this.dbName,
            this.containerName)
        }) as T1;
      });
    }

    public void ConfigureReferenceRepository<T>(IServiceCollection services)
      where T : ICosmosEntity
    {
      services.AddScoped<IReferenceRepository<T>>(provider =>
      {
        return Activator.CreateInstance(typeof(ReferenceRepository<T>), new object[]
        {
          new BaseRepository<T>(provider.GetService<IDatabaseRepositoryFactory>(),
          this.dbName,
          this.containerName)
        }) as IReferenceRepository<T>;
      });
    }

    public void SetDatabaseName(string dbName)
    {
      this.dbName = dbName;
    }

    public void SetContainerName(string container)
    {
      this.containerName = container;
    }

    public bool IsLocalDbMode()
    {
      // TODO: Determine from env/config
      return true;
    }
  }
}