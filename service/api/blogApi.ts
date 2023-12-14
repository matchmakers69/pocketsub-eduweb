import clientApi from "@/config/axios/ApiClient";
import { Tag } from "./types";

export const fetchTags = async (): Promise<Tag[]> => {
  const res = await clientApi.get("/tags");

  return res.data;
};
