import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const blogPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      },
    });
    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not create blog post" },
      { status: 500 },
    );
  }
}
