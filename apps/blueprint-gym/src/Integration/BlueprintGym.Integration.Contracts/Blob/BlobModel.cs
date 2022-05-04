namespace BlueprintGym.Integration.Contracts.Blob
{
  public class BlobModel
  {
    public string BlobId { get; set; }
    public string FriendlyFileName { get; set; }
    public string Container { get; set; }
    public string BlobPath { get; set; } = string.Empty;
    public string FileType { get; set; }
  }
}
