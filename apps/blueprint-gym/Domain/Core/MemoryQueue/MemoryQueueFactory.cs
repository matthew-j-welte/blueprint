using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.MemoryQueue
{
  public class MemoryQueueFactory : IMemoryQueueFactory
  {
    public IMemoryQueue<T> Create<T>(string queueName)
    {
      throw new System.NotImplementedException();
    }
  }
}