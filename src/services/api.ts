import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";

const api = axios.create({
  // baseURL: "http://192.168.0.132:3000/",
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

api.interceptors.request.use(config => {
    const token = getToken();
    // console.log(token)
    if (config.headers === undefined && token === undefined) {
      config.headers = {Authorization: `Bearer ${token}`};
    }
    return config;
  },
);

export default api
