import { Payment, Subscription } from "@prisma/client";

export function getSubscriptionsStats(
  data: (Subscription & {
    payments: Payment[];
  })[],
) {
  let activeSubscriptions = 0;
  const mostExpensive = 0;
  const cheapest = 0;

  data.forEach((subscription) => {
    activeSubscriptions = activeSubscriptions + 1;
  });
}
