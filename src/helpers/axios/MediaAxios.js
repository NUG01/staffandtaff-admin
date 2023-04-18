import Axios from "axios";

const mediaAxios = Axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default mediaAxios;
