"use client";

import { Payment, Subscription } from "@prisma/client";
import {
  calculateMostExpensiveSubscription,
  calculateTheCheapestSubscription,
  // getSubscriptionsStats,
} from "@/app/components/subscriptions/utils/calculateSubscriptions";
import { useCurrencyStore } from "@/src/currencyStore";
import SingleStat from "./SingleStat";

type StatsListProps = {
  subscriptions: (Subscription & {
    payments: Payment[];
  })[];
};

const StatsList = ({ subscriptions }: StatsListProps) => {
  const { exchangeRate } = useCurrencyStore();
  // const stats = getSubscriptionsStats(subscriptions);

  const mostExpensiveSubscription = calculateMostExpensiveSubscription(
    subscriptions,
    exchangeRate ?? {},
  );
  const theCheapestSubscription = calculateTheCheapestSubscription(
    subscriptions,
    exchangeRate ?? {},
  );
  return (
    <div className="flex h-full items-center gap-6">
      <SingleStat
        sum={mostExpensiveSubscription}
        subtitle="Most expensive subscription"
      />

      <SingleStat
        sum={theCheapestSubscription}
        subtitle="The cheapest subscription"
      />
    </div>
  );
};

export default StatsList;
