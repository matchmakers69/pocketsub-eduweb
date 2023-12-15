import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type contextProps = {
  params: {
    postId: string;
  };
};

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;
    await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not delete blog post" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      },
    });
    return NextResponse.json({ message: "Update success", status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update blog post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const blogPost = await prisma.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        tag: true,
      },
    });
    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not fetch single post for blog" },
      { status: 500 },
    );
  }
}
