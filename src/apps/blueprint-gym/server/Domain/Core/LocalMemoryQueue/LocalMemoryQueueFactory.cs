using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.LocalMemoryQueue
{
  public class LocalMemoryQueueFactory : IMemoryQueueFactory
  {
    public IMemoryQueue<T> Create<T>(string queueName)
    {
      return new LocalMemoryQueue<T>(queueName);
    }
  }
}