import { User, Todo as PrismaTodo } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeTodo = Omit<PrismaTodo, "createdAt" | "updatedAt">;

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
  tagId: string;
};

export type Tag = {
  id: string;
  name: string;
};
