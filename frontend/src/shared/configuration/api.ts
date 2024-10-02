import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiUrl + "/api",
  timeout: 30000,
});

api.interceptors.request.use(async (value) => {
  const token = localStorage.getItem("token");

  if (token) {
    value.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  } else {
    delete value.headers.Authorization;
  }

  return value;
});
