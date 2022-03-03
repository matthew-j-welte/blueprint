using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.LocalDatabase
{
  public class LocalRepositoryFactory : IDatabaseRepositoryFactory
  {
    public LocalRepositoryFactory()
    {
    }

    public IDatabaseRepository<T> Create<T>(string databaseName, string collectionName) where T : ICosmosEntity
    {
      return new LocalRepository<T>(databaseName, collectionName);
    }
  }
}
