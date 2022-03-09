import axios, { AxiosResponse } from "axios";
import { WorkoutSetFormView } from "../models/workout.model";

const instance = axios.create({
  baseURL: "http://localhost:5002/workoutset/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const WorkoutSetService = {
  // workout
  getWorkoutSets: (workoutEntryId: string): Promise<WorkoutSetFormView[]> =>
    requests.get(`get/${workoutEntryId}`),
  saveWorkoutSet: (
    workoutSet: WorkoutSetFormView
  ): Promise<WorkoutSetFormView> => requests.put("save", workoutSet),
  saveWorkoutSets: (
    workoutSets: WorkoutSetFormView[]
  ): Promise<WorkoutSetFormView[]> => requests.put("save-all", workoutSets),
  replaceAllWorkoutSets: (
    workoutSets: WorkoutSetFormView[]
  ): Promise<WorkoutSetFormView[]> => requests.put("replace-all", workoutSets),
  deleteWorkoutSets: (workoutEntryId: string): Promise<number> =>
    requests.delete(`delete-all/${workoutEntryId}`),
};
