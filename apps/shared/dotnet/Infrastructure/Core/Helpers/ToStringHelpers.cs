using System;
using System.Linq.Expressions;

namespace BlueprintGym.Infrastructure.Core.Helpers
{
  public class ToStringHelpers
  {
    public static string GetPropertyName<T>(Expression<Func<T>> propertyExpression)
    {
      return (propertyExpression.Body as MemberExpression).Member.Name;
    }
  }
}