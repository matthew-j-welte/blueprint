class Exercise {
  exerciseId: string;
  name: string;
  author: string;
  description: string;
  image: string;
  musclesWorked: string[];
  labels: string[];
}

class WorkoutSetExercise {
  exerciseId: string;
  exerciseName: string;
  specialExerciseFlag: number;
  exerciseIcon: string;
  setAimCutoff: number; // Weight for heavy aim, reps for cardio aim
}

class WorkoutSet {
  setType: string;
  setAim: string;
  exercises: WorkoutSetExercise[];
}

class Workout {
  workoutId: string;
  name: string;
  author: string;
  workoutSets: WorkoutSet[];
}

class SetGoal {
  goalWeight: number;
  goalReps: number;
}

class RegimenWorkout {
  workoutId: string;
  workoutName: string;
  setGoals: SetGoal[];
}

class Regimen {
  regimenId: string;
  name: string;
  author: string;
  startDate: string;
  endDate: string;
  workouts: RegimenWorkout[];
}

class ExerciseEntry {
  exerciseId: string;
  reps: number;
  weight: number;
  cutoff: number;
  smartScore: number;
}

class SetEntry {
  setsPerformed: number;
  setType: string;
  setAim: string;
  exerciseEntries: ExerciseEntry[];
}

class WorkoutEntry {
  workoutId: string;
  userId: string;
  setEntries: SetEntry[];
}
