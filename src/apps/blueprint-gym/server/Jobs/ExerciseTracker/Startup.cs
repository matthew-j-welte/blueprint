using System;
using System.Collections.Generic;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace BlueprintGym.Jobs.ExerciseTracker
{
  public class Startup
  {
    private readonly string dbName;
    private readonly string containerName;

    public Startup(string dbName, string containerName)
    {
      this.dbName = dbName;
      this.containerName = containerName;
    }

    public void ConfigureRepository<T1, T2, T3>(IServiceCollection services)
      where T1 : class
      where T3 : ICosmosEntity
    {
      services.AddSingleton<T1>(provider =>
      {
        return Activator.CreateInstance(typeof(T2), new object[]
        { new BaseRepository<T3>(provider.GetService<IDatabaseRepositoryFactory>(),
          this.dbName,
          this.containerName)
        }) as T1;
      });
    }

    public void ConfigureReferenceRepository<T>(IServiceCollection services)
      where T : ICosmosEntity
    {
      services.AddSingleton<IReferenceRepository<T>>(provider =>
      {
        return Activator.CreateInstance(typeof(ReferenceRepository<T>), new object[]
        {
          new BaseRepository<T>(provider.GetService<IDatabaseRepositoryFactory>(),
          this.dbName,
          this.containerName)
        }) as IReferenceRepository<T>;
      });
    }


  }
}