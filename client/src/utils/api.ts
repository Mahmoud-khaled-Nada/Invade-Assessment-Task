import axios from "axios";
import { LoginParams, Task, TaskParams } from "./types";
import { storage } from "./storage";

const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach Authorization Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.cookies_get("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const postRegister = (data: FormData) =>
  axiosClient.post("/auth/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postLogin = (data: LoginParams) => axiosClient.post("/auth/login", data);

export const postLogout = () => axiosClient.post("/auth/logout");

export const getAuthUser = (config = {}) => axiosClient.get("/auth/me", config);

export const getTasks = async (page = 1) => {
  const { data } = await axiosClient.get(`/tasks?page=${page}`);
  return data;
}
//search

export const searchTasks = async (query: string) => {
  const { data } = await axiosClient.get(`/tasks/search?query=${query}`);
  return data;
}

export const postAddTask = (data: TaskParams) => axiosClient.post("/tasks", data);

export const postChangeComplete = (id: string) => axiosClient.post(`/tasks/${id}/complete`);

export const updateTask = (id: string , data: TaskParams) => axiosClient.put(`/tasks/${id}`, data);

export const deleteTask = (id: string) => axiosClient.delete(`/tasks/${id}`);


export const getRestore = () => axiosClient.get(`/tasks/restore`);


