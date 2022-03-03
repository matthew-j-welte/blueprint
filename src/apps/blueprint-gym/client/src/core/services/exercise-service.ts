import axios, { AxiosResponse } from "axios";
import { ExerciseState } from "../models/enums.model";
import { ExerciseFormView, ExerciseLink } from "../models/exercise.model";
import { ExerciseLookupDto } from "../models/shared.model";

const instance = axios.create({
  baseURL: "http://localhost:5001/exercise/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const ExerciseService = {
  getExerciseFormView: (exerciseId: string): Promise<ExerciseFormView> =>
    requests.get(`get/${exerciseId}`),
  saveExercise: (exercise: ExerciseFormView): Promise<ExerciseFormView> =>
    requests.put("save", exercise),
  deleteExercise: (exerciseId: string): Promise<boolean> =>
    requests.delete(`delete/${exerciseId}`),
  searchExerciseLinks: (
    name: string,
    searchType: ExerciseState
  ): Promise<ExerciseLink[]> =>
    requests.get(`search/links/${name}/${searchType}`),
  searchExerciseLookups: (
    name: string,
    searchType: ExerciseState
  ): Promise<ExerciseLookupDto[]> =>
    requests.get(`search/lookups/${name}/${searchType}`),
};
