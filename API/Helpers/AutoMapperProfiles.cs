namespace API.Helpers;
using API.Entities;
using API.DTOs;
using AutoMapper;
public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberResponse>();
        CreateMap<Photo, PhotoResponse>();
    }
}