namespace BlueprintGym.Domain.WorkoutTracker.Models
{
    public static class Keys
    {
        public static string WorkoutEntry(int workoutIndex, string workoutId) => $"Entry{workoutIndex}-{workoutId}";
    }
}