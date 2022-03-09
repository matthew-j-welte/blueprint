using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IMemoryQueue<T>
  {
    Task Push(T item);
    Task<T> Pop();
    Task Clear();
    Task<bool> IsEmpty();
    Task<Queue<T>> Copy();
  }
}