namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IDatabaseRepositoryFactory
  {
    IDatabaseRepository<T> Create<T>(string databaseName, string collectionName) where T : ICosmosEntity;
  }
}