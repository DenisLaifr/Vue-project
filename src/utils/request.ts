import axios from "axios";
import { app } from "@/main";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: -1,
});

// Response interceptors
service.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (!response) {
      return Promise.reject(error);
    }
    app.config.globalProperties.$toast.add({
      severity: "error",
      summary: "Error",
      detail: response.data.message,
      life: 3000,
    });
    console.log("onerror", error, response);

    if (response.status === 422) {
      return response;
    } else if (response.status === 401) {
      console.log("401 Error");
    } else {
      return response;
    }

    return Promise.reject(error);
  }
);

export default service;
