using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IReferenceRepository<T> where T : ICosmosEntity
  {
    IBaseRepository<T> Base { get; }
    Task<IEnumerable<T>> GetAllRefs();
    Task<IEnumerable<T>> GetAllRefs(Expression<Func<T, bool>> expression);
    Task<T> GetSingleRef();
    Task<T> GetSingleRef(Expression<Func<T, bool>> expression);
  }
}