export const AppRoutes = {
  home: "home",
  newExercise: "exercise/new",
  newWorkout: "workout/new",
  newRegimen: "regimen/new",

  editExercise: (exerciseId: string = ":exerciseId") =>
    `exercise/edit/${exerciseId}`,
  editWorkout: (workoutId: string = ":workoutId") =>
    `workout/edit/${workoutId}`,
  editRegimen: (regimenId: string = ":regimenId") =>
    `regimen/edit/${regimenId}`,

  workoutEntryPage: (workoutId: string = ":workoutId") =>
    `workout/view/${workoutId}`,
  regimenEntryPage: (regimenId: string = ":regimenId") =>
    `regimen/view/${regimenId}`,

  workoutActiveEntry: (workoutId: string = ":workoutId") =>
    `workout/active-entry/${workoutId}`,
  workoutBulkEntry: (workoutId: string = ":workoutId") =>
    `workout/bulk-entry/${workoutId}`,
};
