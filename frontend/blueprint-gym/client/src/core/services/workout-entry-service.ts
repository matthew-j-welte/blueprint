import axios, { AxiosResponse } from "axios";
import { WorkoutEntryFormView } from "../models/workout.model";

const instance = axios.create({
  baseURL: "http://localhost:5002/workoutentry/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const WorkoutEntryService = {
  // workout
  getWorkoutEntries: (workoutId: string): Promise<WorkoutEntryFormView[]> =>
    requests.get(`get/${workoutId}`),
  saveWorkoutEntry: (
    workoutEntry: WorkoutEntryFormView
  ): Promise<WorkoutEntryFormView> => requests.put("save", workoutEntry),
  deleteWorkoutEntry: (workoutEntryId: string): Promise<boolean> =>
    requests.delete(`delete/${workoutEntryId}`),
  deleteWorkoutEntries: (workoutId: string): Promise<number> =>
    requests.delete(`delete-all/${workoutId}`),
};
