import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = user?.accessToken;

    // Add request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          logout()
            .then(() => {
              console.log(
                `You are logged out because of an error with status code ${status}.`
              );
            })
            .catch((logoutErr) => console.error(logoutErr));
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors when the component using this hook unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logout]);

  return axiosInstance;
};

export default useAxiosSecure;
