export type ResourceOwner = "mine" | "global";
export type Resource = "exercise" | "workout" | "regimen";

export const AppRoutes = {
  home: () => "/home",

  newExercise: () => `/exercise/new`,
  newWorkout: () => `/workout/new`,
  newRegimen: () => `/regimen/new`,

  modifyExercise: (
    action: ":action" | "edit" | "pre-publish" | "publish" = ":action",
    exerciseId: string = ":exerciseId"
  ) => `/exercise/${action}/${exerciseId}`,
  modifyWorkout: (
    action: ":action" | "edit" | "pre-publish" | "publish" = ":action",
    workoutId: string = ":workoutId"
  ) => `/workout/${action}/${workoutId}`,
  modifyRegimen: (
    action: ":action" | "edit" | "pre-publish" | "publish" = ":action",
    regimenId: string = ":regimenId"
  ) => `/regimen/${action}/${regimenId}`,

  publishedExercise: (exerciseId: string = ":exerciseId") => `/published-exercise/${exerciseId}`,
  publishedWorkout: (workoutId: string = ":workoutId") => `/published-workout/${workoutId}`,
  publishedRegimen: (regimenId: string = ":regimenId") => `/published-regimen/${regimenId}`,

  myPublishRequestsPage: (userId: string = ":userId") => `/publish-requests/mine/${userId}`,
  adminPublishRequestsPage: (userId: string = ":userId") => `/admin/publish-requests-review/${userId}`,

  workoutResourcesList: (owner: ":owner" | ResourceOwner = ":owner", resource: ":resource" | Resource = ":resource") =>
    `/workout-resources/${owner}/${resource}`,

  workoutEntryPage: (workoutId: string = ":workoutId") => `/workout/view/${workoutId}`,
  regimenEntryPage: (regimenId: string = ":regimenId") => `/regimen/view/${regimenId}`,

  workoutActiveEntry: (workoutId: string = ":workoutId") => `/workout/active-entry/${workoutId}`,
  workoutBulkEntry: (workoutId: string = ":workoutId") => `/workout/bulk-entry/${workoutId}`,
};
