import axios from "axios";
const BasicAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default BasicAxios;
