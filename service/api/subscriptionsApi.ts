import clientApi from "@/config/axios/ApiClient";

export const createSubscription = async (fields: any) => {
  const res = await clientApi.post("/subscription", fields);

  return res;
};
