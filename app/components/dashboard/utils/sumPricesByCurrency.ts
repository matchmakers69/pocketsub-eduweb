import {
  PAYMENT_STATUS,
  Payment,
  SUBSCRIPTION_CURRENCY,
  Subscription,
} from "@prisma/client";

// Obiektowo:
// const summarizePricesOldWay = (subscriptions: Subscription[]) => {
//   let totalEUR = 0;
//   let totalGBP = 0;
//   let totalPLN = 0;
//   for (let i = 0; i < subscriptions.length; i = i + 1) {
//     if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
//       totalPLN += subscriptions[i].price;
//     } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
//       totalEUR += subscriptions[i].price;
//     } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.GBP) {
//       totalGBP += subscriptions[i].price;
//     }
//   }

//   return {
//     totalEUR: parseFloat(totalEUR.toFixed(2)),
//     totalGBP: parseFloat(totalGBP.toFixed(2)),
//     totalPLN: parseFloat(totalPLN.toFixed(2)),
//   };
// };

// Funkcyjnie
export const sumPricesInCurrency = (subscriptions: Subscription[]) => {
  const initialTotal: { [key in SUBSCRIPTION_CURRENCY]: number } = {
    PLN: 0,
    EUR: 0,
    GBP: 0,
    USD: 0,
  };

  const result = subscriptions.reduce((total, subscription) => {
    total[subscription.currency] += subscription.price;

    return total;
  }, initialTotal);

  return result;
};

export type Totals = {
  totalEUR: number;
  totalGBP: number;
  totalPLN: number;
  totalUSD: number;
};

export const summarizePrices = (subscriptions: Subscription[]): Totals => {
  const totals = subscriptions.reduce<Totals>(
    (totals, subscription) => {
      switch (subscription.currency) {
        case SUBSCRIPTION_CURRENCY.PLN:
          totals.totalPLN += subscription.price;
          break;
        case SUBSCRIPTION_CURRENCY.EUR:
          totals.totalEUR += subscription.price;
          break;
        case SUBSCRIPTION_CURRENCY.USD:
          totals.totalUSD += subscription.price;
          break;
        case SUBSCRIPTION_CURRENCY.GBP:
          totals.totalGBP += subscription.price;
          break;
      }
      return totals;
    },
    {
      totalEUR: 0,
      totalGBP: 0,
      totalPLN: 0,
      totalUSD: 0,
    },
  );

  return {
    totalEUR: parseFloat(totals.totalEUR.toFixed(2)),
    totalGBP: parseFloat(totals.totalGBP.toFixed(2)),
    totalUSD: parseFloat(totals.totalGBP.toFixed(2)),
    totalPLN: parseFloat(totals.totalPLN.toFixed(2)),
  };
};

// type TotalsToPay = {
//   totalEURPaid: number;
//   totalGBPPaid: number;
//   totalPLNPaid: number;
//   totalEURNotPaid: number;
//   totalGBPNotPaid: number;
//   totalPLNNotPaid: number;
// };

export const summarizePaymentsAmounts = (
  subscriptions: (Subscription & {
    payments: Payment[];
  })[],
) => {
  let totalEURPaid = 0;
  let totalGBPPaid = 0;
  let totalPLNPaid = 0;
  let totalEURNotPaid = 0;
  let totalGBPNotPaid = 0;
  let totalPLNNotPaid = 0;

  for (let i = 0; i < subscriptions.length; i = i + 1) {
    // kolejna iteracja to przez payments
    for (let j = 0; j < subscriptions[i].payments.length; j = j + 1) {
      const amount = subscriptions[i].payments[j].amount;
      if (subscriptions[i].payments[j].status === PAYMENT_STATUS.PAID) {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEURPaid += amount;
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.GBP) {
          totalGBPPaid += amount;
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
          totalPLNPaid += amount;
        }
      } else {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEURNotPaid += amount;
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.GBP) {
          totalGBPNotPaid += amount;
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
          totalPLNNotPaid += amount;
        }
      }
    }
  }

  totalEURPaid = parseFloat(totalEURPaid.toFixed(2));
  totalGBPPaid = parseFloat(totalGBPPaid.toFixed(2));
  totalPLNPaid = parseFloat(totalPLNPaid.toFixed(2));
  totalEURNotPaid = parseFloat(totalEURNotPaid.toFixed(2));
  totalGBPNotPaid = parseFloat(totalGBPNotPaid.toFixed(2));
  totalPLNNotPaid = parseFloat(totalPLNNotPaid.toFixed(2));

  return {
    totalEURPaid,
    totalGBPPaid,
    totalPLNPaid,
    totalEURNotPaid,
    totalGBPNotPaid,
    totalPLNNotPaid,
  };
};
