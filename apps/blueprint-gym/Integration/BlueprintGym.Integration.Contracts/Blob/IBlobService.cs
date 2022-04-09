using System.IO;
using System.Threading.Tasks;

namespace BlueprintGym.Integration.Contracts.Blob
{
  public interface IBlobService
  {
    Task<BlobModel> Upload(FileStream file, BlobModel blob);
    Task<FileStream> Download(BlobModel blob);
    Task<BlobModel> UploadEncrypted(FileStream file, BlobModel blob);
    Task<FileStream> DownloadEncrypted(BlobModel blob);
    Task<BlobModel> Delete(BlobModel blob);
  }
}