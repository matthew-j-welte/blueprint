using System.Collections.Generic;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.MemoryQueue
{
  public class MemoryQueue<T> : IMemoryQueue<T>
  {
    public Task Clear()
    {
      throw new System.NotImplementedException();
    }

    public Task<Queue<T>> Copy()
    {
      throw new System.NotImplementedException();
    }

    public Task<bool> IsEmpty()
    {
      throw new System.NotImplementedException();
    }

    public Task<T> Pop()
    {
      throw new System.NotImplementedException();
    }

    public Task Push(T item)
    {
      throw new System.NotImplementedException();
    }
  }
}