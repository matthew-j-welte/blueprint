using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BlueprintGym.Infrastructure.Web.Converters
{
  public class DateTimeOffsetConverter : JsonConverter<DateTimeOffset>
  {
    public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
      var value = reader.GetString();
      if (string.IsNullOrWhiteSpace(value))
      {
        return default(DateTimeOffset);
      }

      return DateTimeOffset.Parse(value, CultureInfo.InvariantCulture).ToUniversalTime();
    }

    public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
    {
      writer.WriteStringValue(value.ToUniversalTime().ToString("O", CultureInfo.InvariantCulture));
    }
  }
}