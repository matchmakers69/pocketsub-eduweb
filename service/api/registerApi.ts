import registerApi from "@/config/axios/register";

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await registerApi.post("/register", {
    name,
    email,
    password,
  });

  return res;
};
