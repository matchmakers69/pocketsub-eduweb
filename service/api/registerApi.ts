import clientApi from "@/config/axios/ApiClient";

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await clientApi.post("/register", {
    name,
    email,
    password,
  });

  return res;
};
