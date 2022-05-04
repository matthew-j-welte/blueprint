export const AppRoutes = {
  home: () => "home",
  exerciseList: () => "exercise-list",
  workoutList: () => "workout-list",
  regimenList: () => "regimen-list",

  newExercise: () => `exercise/new`,
  newWorkout: () => `workout/new`,
  newRegimen: () => `regimen/new`,

  modifyExercise: (action: ":action" | "edit" | "publish" = ":action", exerciseId: string = ":exerciseId") =>
    `exercise/${action}/${exerciseId}`,
  modifyWorkout: (action: ":action" | "edit" | "publish" = ":action", workoutId: string = ":workoutId") =>
    `workout/${action}/${workoutId}`,
  modifyRegimen: (action: ":action" | "edit" | "publish" = ":action", regimenId: string = ":regimenId") =>
    `regimen/${action}/${regimenId}`,
  publishedExercise: (exerciseId: string = ":exerciseId") => `published-exercise/${exerciseId}`,
  publishedWorkout: (workoutId: string = ":workoutId") => `published-workout/${workoutId}`,
  publishedRegimen: (regimenId: string = ":regimenId") => `published-regimen/${regimenId}`,

  workoutEntryPage: (workoutId: string = ":workoutId") => `workout/view/${workoutId}`,
  regimenEntryPage: (regimenId: string = ":regimenId") => `regimen/view/${regimenId}`,

  workoutActiveEntry: (workoutId: string = ":workoutId") => `workout/active-entry/${workoutId}`,
  workoutBulkEntry: (workoutId: string = ":workoutId") => `workout/bulk-entry/${workoutId}`,
};
