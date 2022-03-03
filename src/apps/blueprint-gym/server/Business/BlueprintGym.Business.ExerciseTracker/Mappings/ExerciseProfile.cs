using AutoMapper;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.ExerciseTracker.Models;

namespace BlueprintGym.Business.ExerciseTracker.Mappings
{
  public class ExerciseProfile : Profile
  {
    public ExerciseProfile()
    {
      CreateMap<ExerciseFormView, ExerciseRef>()
        .ForMember(x => x.DescriptionSnippet, options => options.MapFrom(x => x.Description.Substring(0, 100)));

      CreateMap<ExerciseRef, ExerciseLookupDto>().ReverseMap();
      CreateMap<ExerciseFormView, Exercise>().ReverseMap();
    }
  }

}