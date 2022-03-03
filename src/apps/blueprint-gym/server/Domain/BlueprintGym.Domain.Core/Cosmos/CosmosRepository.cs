using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;

namespace BlueprintGym.Domain.Core.Cosmos
{
  public class CosmosRepository<T> : IDatabaseRepository<T> where T : ICosmosEntity
  {
    private readonly Container container;

    public CosmosRepository(CosmosClient client, string databaseName, string containerName)
    {
      this.container = client.GetContainer(databaseName, containerName);
    }

    public async Task<T> AddAsync(T entity)
    {
      entity.ModifiedOn = DateTimeOffset.UtcNow;
      return (await this.container.CreateItemAsync(entity, entity.PK).ConfigureAwait(false)).Resource;
    }

    public async Task DeleteByIdAsync(string id, string partiionKey)
    {
      await this.container.DeleteItemAsync<T>(id, new PartitionKey(partiionKey));
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
      var entities = new List<T>();
      using (var iter = this.container.GetItemLinqQueryable<T>().ToFeedIterator())
      {
        while (iter.HasMoreResults)
        {
          foreach (var entity in await iter.ReadNextAsync())
          {
            entities.Add(entity);
          }
        }
      }
      return entities;
    }

    public async Task<T> GetByIdAsync(string id, string partitionKey)
    {
      try
      {
        return (await this.container.ReadItemAsync<T>(id, new PartitionKey(partitionKey)).ConfigureAwait(false)).Resource;
      }
      catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
      {
        return default;
      }
    }

    public async Task<T> GetByIdAsync(string id)
    {
      try
      {
        var partitionKey = ((T)Activator.CreateInstance(typeof(T))).PK;
        return (await this.container.ReadItemAsync<T>(id, partitionKey).ConfigureAwait(false)).Resource;
      }
      catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
      {
        return default;
      }
    }

    public async Task<IEnumerable<T>> GetByQueryAsync(string sql)
    {
      var entities = new List<T>();
      var query = new QueryDefinition(sql);
      string continuationToken = null;
      do
      {
        var feedIter = this.container.GetItemQueryIterator<T>(query, continuationToken);
        while (feedIter.HasMoreResults)
        {
          var response = await feedIter.ReadNextAsync();
          continuationToken = response.ContinuationToken;
          foreach (var entity in response)
          {
            entities.Add(entity);
          }
        }
      }
      while (continuationToken != null);
      return entities;
    }

    public async Task<IEnumerable<T>> GetByQueryAsync(Expression<Func<T, bool>> expression)
    {
      var entities = new List<T>();
      using (var iter = this.container.GetItemLinqQueryable<T>().Where(expression).ToFeedIterator())
      {
        while (iter.HasMoreResults)
        {
          foreach (var entity in await iter.ReadNextAsync())
          {
            entities.Add(entity);
          }
        }
      }
      return entities;
    }

    public async Task<T> UpsertAsync(T entity)
    {
      entity.ModifiedOn = DateTimeOffset.UtcNow;
      return (await this.container.UpsertItemAsync(entity, entity.PK).ConfigureAwait(false)).Resource;
    }
  }
}