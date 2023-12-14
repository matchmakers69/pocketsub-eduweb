import { prisma } from "@/lib/db";

export default async function getTodos() {
  try {
    const res = prisma.todo.findMany();
    return res;
  } catch (error) {
    throw new Error("Cannot fetch todos");
  }
}
