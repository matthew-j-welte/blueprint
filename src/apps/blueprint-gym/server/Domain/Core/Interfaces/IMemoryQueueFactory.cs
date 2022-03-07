namespace BlueprintGym.Domain.Core.Interfaces
{
  public interface IMemoryQueueFactory
  {
    IMemoryQueue<T> Create<T>(string queueName);
  }
}