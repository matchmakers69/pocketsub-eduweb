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

export const deleteBlogArticle = async (id: string) => {
  const res = await clientApi.delete(`/blog/${id}`);

  return res;
};

export const updateBlogArticle = async (id: string, newArticle: BlogPost) => {
  const res = await clientApi.patch(`/blog/${id}`, newArticle);

  return res;
};

export const fetchSinglePost = async (id: string) => {
  const res = await clientApi.get(`/blog/${id}`);

  return res.data;
};
