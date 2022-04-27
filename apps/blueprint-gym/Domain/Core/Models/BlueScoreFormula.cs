namespace BlueprintGym.Domain.Core.Models
{
  public class BlueScoreFormula
  {
    public long RepsMultiplier { get; set; }
    public long WeightMultiplier { get; set; }
    public long RepsExtraMultiplierCutoff { get; set; }
    public long WeightExtraMultiplierCutoff { get; set; }
    public string RepsLabel { get; set; }
  }
}