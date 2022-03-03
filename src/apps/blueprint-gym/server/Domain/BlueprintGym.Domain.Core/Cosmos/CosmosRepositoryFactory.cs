using BlueprintGym.Domain.Core.Interfaces;
using Microsoft.Azure.Cosmos;

namespace BlueprintGym.Domain.Core.Cosmos
{
  public class CosmosRepositoryFactory : IDatabaseRepositoryFactory
  {
    private readonly CosmosClient cosmosClient;

    public CosmosRepositoryFactory(CosmosClient cosmosClient)
    {
      this.cosmosClient = cosmosClient;
    }

    public IDatabaseRepository<T> Create<T>(string databaseName, string collectionName) where T : ICosmosEntity
    {
      return new CosmosRepository<T>(this.cosmosClient, databaseName, collectionName);
    }
  }
}