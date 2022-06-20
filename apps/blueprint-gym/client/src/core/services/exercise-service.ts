import axios, { AxiosResponse } from "axios";
import { ExerciseState } from "../models/enums.model";
import {
  ExerciseFormView,
  ExerciseLink,
  ExercisePrePublishFormView,
  ExercisePublishFormView,
  ExercisePublishRequestDto,
} from "../models/exercise.model";
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
  getNewExercise: (): Promise<ExerciseFormView> => {
    return requests.get(`new`);
  },
  getExercise: (exerciseId: string = ""): Promise<ExerciseFormView> => {
    return requests.get(`get/${exerciseId}`);
  },
  getExerciseForPublish: (exerciseId: string = ""): Promise<ExercisePublishFormView> =>
    requests.get(`publish/get/${exerciseId}`),
  getExerciseForPrePublish: (exerciseId: string = ""): Promise<ExercisePrePublishFormView> =>
    requests.get(`pre-publish/get/${exerciseId}`),
  saveExercise: (exercise: ExerciseFormView, action: string = "error"): Promise<ExerciseFormView> => {
    if (action === "new") {
      return requests.post("new", exercise);
    } else if (action === "edit") {
      return requests.put("save", exercise);
    } else if (action === "pre-publish") {
      return requests.put("pre-publish", exercise);
    }
    return Promise.reject("Wrong action!");
  },
  getMyPublishRequests: (userId: string): Promise<ExercisePublishRequestDto[]> =>
    requests.get(`publish-requests/${userId}`),
  getPublishRequestsForAdminReview: (userId: string): Promise<ExercisePublishRequestDto[]> =>
    requests.get(`admin-publish-requests/${userId}`),
  deleteExercise: (exerciseId: string): Promise<boolean> => requests.delete(`delete/${exerciseId}`),
  getAllExerciseLinks: (searchType: ExerciseState): Promise<ExerciseLink[]> =>
    requests.get(`search/all-links/${searchType}`),
  getAllExerciseLookups: (searchType: ExerciseState): Promise<ExerciseLookupDto[]> =>
    requests.get(`search/all-lookups/${searchType}`),
  searchExerciseLinks: (name: string, searchType: ExerciseState): Promise<ExerciseLink[]> =>
    requests.get(`search/links/${searchType}/${name}`),
  searchExerciseLookups: (name: string, searchType: ExerciseState): Promise<ExerciseLookupDto[]> =>
    requests.get(`search/lookups/${searchType}/${name}`),
};
