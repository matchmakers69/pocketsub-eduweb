import clientApi from "@/config/axios/ApiClient";
import { BlogPost, Tag } from "./types";

export const fetchTags = async (): Promise<Tag[]> => {
  const res = await clientApi.get("/tags");

  return res.data;
};

export const createBlogArticle = async (newArticle: BlogPost) => {
  const res = await clientApi.post("/blog/create", newArticle);

  return res;
};
