import clientApi from "@/config/axios/ApiClient";
import { Subscription } from "@prisma/client";

export const createSubscription = async (subscription: Subscription) => {
  const res = await clientApi.post("/subscription", subscription);

  return res;
};
