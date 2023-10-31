import { prisma } from "@/lib/db";

export default async function getTodos() {
  try {
    const res = prisma.todo.findMany();
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
