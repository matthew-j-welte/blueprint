using System.IO;
using System.Threading.Tasks;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Integration.Contracts.Blob;

namespace BlueprintGym.Integration.Blob
{
  public class BlobService : IBlobService
  {
    private readonly IReferenceRepository<BlobEntity> blobRepository;

    public Task<BlobModel> Delete(BlobModel blob)
    {
      throw new System.NotImplementedException();
    }

    public Task<FileStream> Download(BlobModel blob)
    {
      throw new System.NotImplementedException();
    }

    public Task<FileStream> DownloadEncrypted(BlobModel blob)
    {
      throw new System.NotImplementedException();
    }

    public Task<BlobModel> Upload(FileStream file, BlobModel blob)
    {
      throw new System.NotImplementedException();
    }

    public Task<BlobModel> UploadEncrypted(FileStream file, BlobModel blob)
    {
      throw new System.NotImplementedException();
    }
  }
}