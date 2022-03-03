using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IDatabaseRepository<T> where T : ICosmosEntity
  {
    Task<T> AddAsync(T entity);
    Task<T> UpsertAsync(T entity);
    Task<T> GetByIdAsync(string id);
    Task<T> GetByIdAsync(string id, string partiionKey);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> GetByQueryAsync(string sql);
    Task<IEnumerable<T>> GetByQueryAsync(Expression<Func<T, bool>> expression);
    Task DeleteByIdAsync(string id, string partiionKey);
  }
}