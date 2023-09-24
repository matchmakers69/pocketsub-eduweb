import axiosClient, { AxiosInstance } from "axios";

const registerApi: AxiosInstance = axiosClient.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});

registerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    }
  },
);

export default registerApi;
