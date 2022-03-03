using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IBaseRepository<T> where T : ICosmosEntity
  {
    Task<T> AddAsync(T entity);
    Task DeleteByIdAsync(string id, string partiionKey);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(string id);
    Task<T> GetByIdAsync(string id, string partiionKey);
    // Task<IEnumerable<T>> GetManyByIdAsync(string id, string partiionKey);
    Task<IEnumerable<T>> GetByQueryAsync(string sql);
    Task<IEnumerable<T>> GetByQueryAsync(Expression<Func<T, bool>> expression);
    Task<T> UpsertAsync(T entity);
  }
}