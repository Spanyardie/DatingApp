using DatingApp.DTOs;
using DatingApp.Entities;
using System.Collections.Generic;

namespace DatingApp.Interfaces
{
    public interface IPhotoRepository
    {
        IEnumerable<PhotoForApprovalDto> GetUnapprovedPhotos();
        Photo GetPhotoById(int id);
        void RemovePhoto(Photo photo);
    }
}
