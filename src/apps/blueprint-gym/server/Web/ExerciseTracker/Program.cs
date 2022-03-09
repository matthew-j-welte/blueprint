using BlueprintGym.Infrastructure.Web.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace BlueprintGym.Web.ExerciseTracker
{
  public class Program
  {
    public static int Main(string[] args)
    {
      return ApiStartupService.RunHost(CreateHostBuilder, args, "ExerciseService");
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
