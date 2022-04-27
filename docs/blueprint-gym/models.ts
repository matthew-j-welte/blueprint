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

class WorkoutSetEntry {
  setType: string;
  setAim: string;
  exercises: WorkoutSetExercise[];
  expectedSetCount: number | null; // amount of sets the user expects to do when doing an entry
}

class Workout {
  workoutId: string;
  name: string;
  author: string;
  workoutSets: WorkoutSetEntry[];
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
  exerciseEntryId: string;
  exerciseId: string;
  workoutId: string;
  reps: number;
  weight: number;
  cutoff: number;
  smartScore: number;
}

class WorkoutExerciseRepEntry {
  exerciseId: string;
  workoutId: string; // partition
  reps: number;
  weight: number;
  cutoff: number;
  smartScore: number;
}

class SetEntry {
  setsPerformed: number;
  setType: string;
  setAim: string;
  exerciseEntries: WorkoutExerciseRepEntry[];
}

class WorkoutEntry {
  workoutId: string;
  userId: string;
  setEntries: SetEntry[];
  workoutBegin: Date;
  workoutEnd: Date;
}

class RegimenCard {
  regimenId: string;
  name: string;
  author: string;
  startDate: string;
  endDate: string;
}
