import axios, { AxiosResponse } from "axios";
import { WorkoutLink, WorkoutLookupDto } from "../models/shared.model";
import { WorkoutFormView } from "../models/workout.model";

const instance = axios.create({
  baseURL: "http://localhost:5002/workout/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const WorkoutService = {
  // workout
  getWorkoutFormView: (workoutId: string): Promise<WorkoutFormView> => requests.get(`get/${workoutId}`),
  saveWorkout: (workout: WorkoutFormView): Promise<WorkoutFormView> => requests.put("save", workout),
  deleteWorkout: (workoutId: string): Promise<boolean> => requests.delete(`delete/${workoutId}`),
  searchWorkoutLinks: (name: string): Promise<WorkoutLink[]> => requests.get(`search/links/${name}`),
  searchWorkoutLookups: (name: string): Promise<WorkoutLookupDto[]> => requests.get(`search/links/${name}`),
  getAllWorkoutLinks: (): Promise<WorkoutLink[]> => requests.get("search/all-links"),
  getAllWorkoutLookups: (): Promise<WorkoutLookupDto[]> => requests.get("search/all-lookups"),
};
