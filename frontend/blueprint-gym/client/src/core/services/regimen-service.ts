import axios, { AxiosResponse } from "axios";
import { RegimenFormView } from "../models/workout.model";

const instance = axios.create({
  baseURL: "http://localhost:5002/regimen/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const RegimenService = {
  getRegimenFormView: (regimenId: string): Promise<RegimenFormView> => requests.get(`get/${regimenId}`),
  saveRegimen: (regimen: RegimenFormView): Promise<RegimenFormView> => requests.put("save", regimen),
  deleteRegimen: (regimenId: string): Promise<boolean> => requests.delete(`delete/${regimenId}`),
};
