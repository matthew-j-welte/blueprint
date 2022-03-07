using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.Repositories
{
  public class ReferenceRepository<T> : IReferenceRepository<T> where T : ICosmosEntity
  {
    private readonly IBaseRepository<T> baseRepository;

    public ReferenceRepository(
      IBaseRepository<T> baseRepository)
    {
      this.baseRepository = baseRepository;
    }

    public IBaseRepository<T> Base => this.baseRepository;

    public async Task<IEnumerable<T>> GetAllRefs(Expression<Func<T, bool>> expression)
    {
      return await this.Base.GetByQueryAsync(expression).ConfigureAwait(false);
    }

    public async Task<IEnumerable<T>> GetAllRefs()
    {
      return (await this.Base.GetByQueryAsync(
          x => x.Type == typeof(T).Name).ConfigureAwait(false));
    }

    public async Task<T> GetSingleRef()
    {
      return (await this.Base.GetByQueryAsync(
          x => x.Type == typeof(T).Name).ConfigureAwait(false)).SingleOrDefault();
    }

    public async Task<T> GetSingleRef(Expression<Func<T, bool>> expression)
    {
      return (await this.Base.GetByQueryAsync(expression).ConfigureAwait(false)).FirstOrDefault();
    }
  }
}