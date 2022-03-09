# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/runtime:5.0
COPY bin/Release/net5.0/publish/ app/
WORKDIR /app

ENTRYPOINT ["dotnet", "BlueprintGym.Jobs.ExerciseTracker.dll"]