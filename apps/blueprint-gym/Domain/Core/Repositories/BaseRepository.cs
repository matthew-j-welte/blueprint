using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.Repositories
{
  public class BaseRepository<T> : IBaseRepository<T> where T : ICosmosEntity
  {
    private readonly IDatabaseRepository<T> databaseRepository;

    public BaseRepository(IDatabaseRepositoryFactory databaseRepositoryFactory, string databaseName, string containerName)
    {
      this.databaseRepository = databaseRepositoryFactory.Create<T>(databaseName, containerName);
    }

    public async Task<T> AddAsync(T entity)
    {
      return await this.databaseRepository.AddAsync(entity);
    }

    public async Task<IEnumerable<T>> AddAsync(IEnumerable<T> entities)
    {
      return await this.databaseRepository.AddAsync(entities);
    }

    public async Task DeleteByIdAsync(string id, string partiionKey)
    {
      await this.databaseRepository.DeleteByIdAsync(id, partiionKey);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
      return await this.databaseRepository.GetAllAsync();
    }

    public async Task<T> GetByIdAsync(string id)
    {
      return await this.databaseRepository.GetByIdAsync(id);
    }

    public async Task<T> GetByIdAsync(string id, string partiionKey)
    {
      return await this.databaseRepository.GetByIdAsync(id, partiionKey);
    }

    public async Task<IEnumerable<T>> GetByQueryAsync(string sql)
    {
      return await this.databaseRepository.GetByQueryAsync(sql);
    }

    public async Task<IEnumerable<T>> GetByQueryAsync(Expression<Func<T, bool>> expression)
    {
      return await this.databaseRepository.GetByQueryAsync(expression);
    }

    public async Task<T> UpsertAsync(T entity)
    {
      return await this.databaseRepository.UpsertAsync(entity);
    }
  }
}