import { prisma } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

type NextPaymentSortType = "asc" | "desc";

export default async function getSubscriptionsData(
  nextPaymentSort: NextPaymentSortType,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return;
    }

    const res = prisma.subscription.findMany({
      where: { ownerId: currentUser.id },
      include: { payments: true },
      orderBy: { next_payment_date: nextPaymentSort },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
