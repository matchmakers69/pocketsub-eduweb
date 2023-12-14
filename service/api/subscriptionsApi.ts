import clientApi from "@/config/axios/ApiClient";
import { Subscription } from "@prisma/client";

type NewSubscription = Omit<
  Subscription,
  "id" | "start_date" | "end_date" | "status"
>;

export const createSubscription = async (subscription: NewSubscription) => {
  const res = await clientApi.post("/subscription", subscription);

  return res;
};
