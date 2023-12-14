"use server";
import { prisma } from "@/lib/db";
// import getCurrentUser from "./getCurrentUser";

export default async function getSubscriptionsData(
  userId: string,
  orderBy: { key: string; value: string },
) {
  try {
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   return;
    // }

    const res = await prisma.subscription.findMany({
      where: { ownerId: userId },
      include: { payments: true },
      orderBy: { [`${orderBy.key}`]: orderBy.value },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to fetch subscriptions data");
  }
}
