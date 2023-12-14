import { prisma } from "@/lib/db";

export default async function getBlogArticle(id: string) {
  try {
    const res = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Cannot fetch articles");
  }
}
