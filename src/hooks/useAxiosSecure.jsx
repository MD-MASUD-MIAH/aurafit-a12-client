import axios from "axios";

import useAuth from "./useAuth";


const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();

  const token = user?.accessToken;

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401 || err.status === 403) {
        logout()
          .then(() => {
            console.log(
              `You are logged out because of an error with ${err.status} code.`
            );
          })
          .catch((err) => console.log(err));
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;