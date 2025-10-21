import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

export default {
  get: (path) => instance.get(path),
  post: (path, data) => instance.post(path, data),
  put: (path, data) => instance.put(path, data),
  delete: (path) => instance.delete(path),
  raw: instance,
};
