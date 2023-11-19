import { ExchangeRate } from "@/app/types/Currencies";
import {
  Payment,
  SUBSCRIPTION_BILLING_PERIOD,
  Subscription,
} from "@prisma/client";

export const calculateMostExpensiveSubscription = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  return data
    .reduce((acc, subscription) => {
      const { currency, price } = subscription;

      const costInGbp = price / exchangeRate[currency];

      const mostExpensive = acc > costInGbp ? acc : costInGbp;
      return mostExpensive;
    }, 0)
    .toFixed(2);
};

export const calculateTheCheapestSubscription = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  return data
    .reduce((acc, subscription) => {
      const { price, currency } = subscription;

      const costInGbp = price / exchangeRate[currency];

      const minExpensive = acc > costInGbp ? costInGbp : acc;

      return minExpensive;
    }, Infinity)
    .toFixed(2);
};

export function getSubscriptionsStats(
  data: (Subscription & {
    payments: Payment[];
  })[],
  exchangeRate: ExchangeRate,
) {
  let activeSubscriptions = 0;
  let totalMonthlyCost = 0;
  let totalYearlyCost = 0;

  data.forEach((subscription) => {
    activeSubscriptions = activeSubscriptions + 1;
    const costInGbp = subscription.price / exchangeRate[subscription.currency];

    // Monthly and yearly cost
    switch (subscription.billing_period) {
      case SUBSCRIPTION_BILLING_PERIOD.MONTHLY:
        totalMonthlyCost += costInGbp;
        totalYearlyCost += costInGbp * 12;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.YEARLY:
        totalMonthlyCost += costInGbp / 12;
        totalYearlyCost += costInGbp;

      default:
        break;
    }
  });
  const avgCostPerSub = totalMonthlyCost / activeSubscriptions;
  return {
    totalActiveSubscriptions: activeSubscriptions,
    averageCostPerSubscription: avgCostPerSub.toFixed(2),
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
    totalYearlyCost: totalYearlyCost.toFixed(2),
  };
}
