import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://studapi.teachmeskills.by",
});

authInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authInstance;