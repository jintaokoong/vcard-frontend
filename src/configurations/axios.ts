import axios from "axios";
import * as auth from "firebase/auth";
import { assoc, defaultTo } from "ramda";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const currentUser = auth.getAuth().currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      const headers = defaultTo({})(config.headers);
      config.headers = assoc("Authorization", `Bearer ${token}`, headers);
    } catch (error) {
      console.error(error);
    }
  }
  return config;
});

export default axiosInstance;
