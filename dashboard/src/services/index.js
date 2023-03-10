import axios from "axios";
import router from "@/router";
import AuthService from "./auth";
import UsersService from "./users";
import FeedbacksService from "./feedbacks";
import { setGlobalLoding } from "@/store/global";

const API_ENVS = {
  production: "https://backend-treinamento-vue3-anybuss.vercel.app/",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoding(true);
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoding(false);
    return response;
  },
  (error) => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      setGlobalLoding(false);
      throw new Error(error.message);
    }

    if (error.response.status === 401) {
      router.push({ name: "home" });
    }

    setGlobalLoding(false);
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient),
};
