using AutoMapper;
using BlueprintGym.Business.ExerciseTracker.Models;
using BlueprintGym.Business.Shared.Models;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Domain.ExerciseTracker.Models;
using ExerciseTracker.Models;

namespace BlueprintGym.Business.ExerciseTracker.Mappings
{
  public class ExerciseProfile : Profile
  {
    public ExerciseProfile()
    {
      CreateMap<ExerciseFormView, ExerciseRef>()
        .ForMember(x => x.DescriptionSnippet, options => options.MapFrom(x => x.Description.Length > 100 ? x.Description.Substring(0, 100) : x.Description));
      CreateMap<Exercise, ExerciseRef>()
        .ForMember(x => x.DescriptionSnippet, options => options.MapFrom(x => x.Description.Length > 100 ? x.Description.Substring(0, 100) : x.Description));

      CreateMap<ExerciseRef, ExerciseLookupDto>().ReverseMap();
      CreateMap<ExerciseRef, ExerciseLink>();
      CreateMap<ExerciseFormView, Exercise>().ReverseMap();
      CreateMap<ExercisePublishRequestRef, ExercisePublishRequestDto>().ReverseMap();
      CreateMap<ExercisePrePublishFormView, ExerciseFormView>().ReverseMap();
      CreateMap<ExercisePrePublishFormView, ExercisePublishRequestRef>();
    }
  }

}