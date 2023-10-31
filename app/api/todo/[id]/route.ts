import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { title, complete } = await req.json();
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      complete: complete,
    },
  });

  return NextResponse.json({ message: "Updated" }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    await prisma.todo.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Deleted Item" }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No user with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
