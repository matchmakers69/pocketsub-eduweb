import { prisma } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export default async function getDashboardData() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return;
    }

    const res = prisma.subscription.findMany({
      where: { ownerId: currentUser.id },
      include: { payments: true },
      orderBy: { next_payment_date: "asc" },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
