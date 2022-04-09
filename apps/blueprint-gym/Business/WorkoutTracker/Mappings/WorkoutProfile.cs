using System.Linq;
using AutoMapper;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Business.WorkoutTracker.Models;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.WorkoutTracker.Models;
using BlueprintGym.Domain.WorkoutTracker.Models.Containers;

namespace BlueprintGym.Business.WorkoutTracker.Mappings
{
  public class WorkoutProfile : Profile
  {
    public WorkoutProfile()
    {
      CreateMap<Workout, WorkoutRef>();
      CreateMap<Workout, WorkoutLink>();
      CreateMap<Workout, WorkoutLookupDto>();

      CreateMap<WorkoutRef, WorkoutLink>();

      CreateMap<WorkoutFormView, Workout>().ReverseMap();
      CreateMap<WorkoutFormView, WorkoutRef>()
        .ForMember(x => x.MusclesWorked, memberOptions => memberOptions.MapFrom(x => x.ExerciseAssignments.SelectMany(y => y.MusclesWorked)));

      CreateMap<WorkoutEntryFormView, WorkoutEntry>().ReverseMap();
      CreateMap<WorkoutEntryFormView, WorkoutEntryRef>();
      CreateMap<WorkoutEntryLookupDto, WorkoutEntryRef>().ReverseMap();

      CreateMap<RegimenFormView, Regimen>().ReverseMap();

      CreateMap<WorkoutSetFormView, WorkoutSet>().ReverseMap();
    }
  }
}