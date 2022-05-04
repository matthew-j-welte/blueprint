namespace BlueprintGym.Business.Shared.Models
{
  public class BlobObjectDto : BaseEntityModel
  {
    public string BlobId { get; set; }
    public string FriendlyFileName { get; set; }
    public string Container { get; set; }
    public string BlobPath { get; set; } = string.Empty;
    public string FileType { get; set; }
  }
}