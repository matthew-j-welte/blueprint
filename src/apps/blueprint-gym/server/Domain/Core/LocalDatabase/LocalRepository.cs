using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.LocalDatabase
{
  public class LocalRepository<T> : IDatabaseRepository<T> where T : ICosmosEntity
  {
    private readonly string databaseName;
    private readonly string fullPath;

    public LocalRepository(string databaseName, string containerName, bool isRefRepository = false)
    {
      this.databaseName = databaseName;

      var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "development";
      var blueprintPath = Environment.GetEnvironmentVariable("BLUEPRINT_GYM_PATH");
      if (string.IsNullOrEmpty(blueprintPath))
      {
        throw new SystemException("Must set BLUEPRINT_GYM_PATH path!");
      }

      var localDbStoragePath = Path.Join(blueprintPath, "local-db", env.ToLower());

      Directory.CreateDirectory(localDbStoragePath);
      localDbStoragePath = Path.Join(localDbStoragePath, "cosmos");
      Directory.CreateDirectory(localDbStoragePath);

      localDbStoragePath = Path.Join(localDbStoragePath, containerName);
      Directory.CreateDirectory(localDbStoragePath);
      var type = typeof(T).Name;
      this.fullPath = Path.Join(localDbStoragePath, type + ".json");
      if (!(new System.IO.FileInfo(fullPath).Exists))
      {
        var emptyList = new List<T>();
        var json = JsonSerializer.Serialize<IEnumerable<T>>(emptyList, options: new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(fullPath, json);
      }
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
      return (await ReadContainer()).ToList();
    }

    public async Task<T> GetByIdAsync(string id)
    {
      return (await ReadContainer()).Where(x => x.Id == id).FirstOrDefault();
    }

    public async Task<T> GetByIdAsync(string id, string partitionKey)
    {
      return (await ReadContainer()).Where(x => x.Id == id && x.PK.ToString() == partitionKey).FirstOrDefault();
    }

    public async Task<IEnumerable<T>> GetMultipleByIdAsync(IEnumerable<string> ids)
    {
      return (await ReadContainer()).Where(x => ids.Contains(x.Id)).ToList();
    }

    public async Task<T> UpsertAsync(T entity)
    {
      var records = (await ReadContainer()).ToList();
      var existingIndex = records.FindIndex(x => x.Id == entity.Id);
      if (existingIndex != -1)
      {
        records[existingIndex] = entity;
      }
      else
      {
        records.Add(entity);
      }
      await WriteContainer(records);
      return entity;
    }

    public async Task Clear()
    {
      await WriteContainer(new List<T>());
    }

    private async Task<IEnumerable<T>> ReadContainer()
    {
      var json = await File.ReadAllTextAsync(fullPath);
      var records = JsonSerializer.Deserialize<List<T>>(json);
      if (records == null) throw new JsonException("Failed to deserialize");
      return records;
    }

    private async Task WriteContainer(IEnumerable<T> records)
    {
      var json = JsonSerializer.Serialize<IEnumerable<T>>(records, options: new JsonSerializerOptions { WriteIndented = true });
      await File.WriteAllTextAsync(fullPath, json);
    }

    public async Task<T> AddAsync(T entity) => await this.UpsertAsync(entity);

    public async Task<IEnumerable<T>> AddAsync(IEnumerable<T> entities)
    {
      foreach (var entity in entities)
      {
        await this.UpsertAsync(entity).Result;
      }
    }

    public Task<IEnumerable<T>> GetByQueryAsync(string sql)
    {
      throw new NotImplementedException();
    }

    public async Task<IEnumerable<T>> GetByQueryAsync(Expression<Func<T, bool>> expression)
    {

      var container = await ReadContainer();
      return container.AsQueryable().Where(expression);
    }

    public async Task DeleteByIdAsync(string id, string partiionKey)
    {
      var records = (await ReadContainer()).ToList();
      var toDelete = records.Where(x => x.Id == id).FirstOrDefault();
      records.Remove(toDelete);
      await WriteContainer(records);
    }

    public Task<T> GetByPartitionKeyAsync(string partiionKey)
    {
      throw new NotImplementedException();
    }
  }
}
