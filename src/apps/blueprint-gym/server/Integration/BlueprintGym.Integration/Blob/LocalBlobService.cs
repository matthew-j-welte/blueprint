using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using BlueprintGym.Domain.Core.Interfaces;
using BlueprintGym.Domain.Core.Models;
using BlueprintGym.Integration.Contracts.Blob;

namespace BlueprintGym.Integration.Blob
{

  public class LocalBlobService : IBlobService
  {
    private readonly string localBlobStoragePath;
    private readonly IMapper mapper;
    private readonly IBlobRepository blobRepository;

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

    public async Task<BlobModel> Upload(FileStream file, BlobModel blob)
    {
      var blobDir = Path.Join(this.localBlobStoragePath, blob.Container);
      Directory.CreateDirectory(blobDir);
      var blobPath = Path.Join(blobDir, blob.FriendlyFileName);
      using (var stream = new FileStream(blobPath, FileMode.OpenOrCreate))
      {
        file.Seek(0, SeekOrigin.Begin);
        await file.CopyToAsync(stream);
      }

      var uploadedBlob = this.blobRepository.Base.UpsertAsync(mapper.Map<BlobEntity>(blob));
      return mapper.Map<BlobModel>(uploadedBlob);
    }

    public Task<BlobModel> UploadEncrypted(FileStream file, BlobModel blob)
    {
      throw new System.NotImplementedException();
    }
  }
}