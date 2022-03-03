using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;

namespace BlueprintGym.Domain.Core.LocalMemoryQueue
{
  public class LocalMemoryQueue<T> : IMemoryQueue<T>
  {
    private readonly string name;
    private readonly string fullPath;

    public LocalMemoryQueue(string name)
    {
      this.name = name;
      var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "development";
      var localDbStoragePath = Path.Join(Environment.GetEnvironmentVariable("BLUEPRINT_GYM_PATH"), "local-db", env.ToLower());

      Directory.CreateDirectory(localDbStoragePath);
      localDbStoragePath = Path.Join(localDbStoragePath, "memory-queue");
      Directory.CreateDirectory(localDbStoragePath);

      this.fullPath = Path.Join(localDbStoragePath, this.name + ".json");
      if (!(new System.IO.FileInfo(this.fullPath).Exists))
      {
        var emptyList = new Queue<T>();
        var json = JsonSerializer.Serialize<Queue<T>>(emptyList, options: new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(this.fullPath, json);
      }
    }
    public async Task Clear()
    {
      await this.WriteContainer(new Queue<T>()).ConfigureAwait(false);
    }

    public async Task<Queue<T>> Copy()
    {
      return await this.ReadQueue();
    }

    public async Task<bool> IsEmpty()
    {
      return (await this.ReadQueue().ConfigureAwait(false)).Count == 0;
    }

    public async Task<T> Pop()
    {
      var queue = await this.ReadQueue();
      var has = queue.TryDequeue(out var res);
      if (has)
      {
        await this.WriteContainer(queue);
        return res;
      }
      return default(T);
    }

    public async Task Push(T item)
    {
      var queue = await this.ReadQueue();
      queue.Enqueue(item);
      await this.WriteContainer(queue);
    }

    private async Task<Queue<T>> ReadQueue()
    {
      var json = await File.ReadAllTextAsync(fullPath).ConfigureAwait(false);
      var records = JsonSerializer.Deserialize<Queue<T>>(json);
      if (records == null) throw new JsonException("Failed to deserialize");
      return records;
    }

    private async Task WriteContainer(Queue<T> records)
    {
      var json = JsonSerializer.Serialize<Queue<T>>(records, options: new JsonSerializerOptions { WriteIndented = true });
      await File.WriteAllTextAsync(fullPath, json).ConfigureAwait(false);
    }
  }
}