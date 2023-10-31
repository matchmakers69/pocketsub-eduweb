import clientApi from "@/config/axios/ApiClient";
import { SafeTodo } from "./types";

export const createTodoService = async ({ title }: SafeTodo) => {
  const res = await clientApi.post("/todo", {
    title,
  });

  return res;
};

export const updateTodoService = async ({ id, title, complete }: SafeTodo) => {
  const res = await clientApi.patch(`/todo/${id}`, {
    title,
    complete,
  });
  return res;
};

export const deleteTodoService = async (id: string) => {
  const res = await clientApi.delete(`/todo/${id}`);
  console.log(res, "res");
  return res;
};
