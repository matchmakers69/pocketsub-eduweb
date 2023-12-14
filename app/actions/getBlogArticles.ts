import { prisma } from "@/lib/db";

export default async function getBlogPosts() {
  try {
    const res = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  } catch (error) {
    throw new Error("Cannot fetch articles");
  }
}
