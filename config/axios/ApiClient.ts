import axiosClient, { AxiosInstance } from "axios";

const clientApi: AxiosInstance = axiosClient.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    }
  },
);

export default clientApi;
