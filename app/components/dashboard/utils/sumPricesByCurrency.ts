import { SUBSCRIPTION_CURRENCY, Subscription } from "@prisma/client";

// Obiektowo:
// const summarizePrices = (subscriptions: Subscription[]) => {
//     let totalEUR = 0;
//     let totalGBP = 0;
//     let totalPLN = 0;
//     for (let i = 0; i < subscriptions.length; i = i + 1) {
//       if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
//         totalPLN += subscriptions[i].price;
//       } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
//         totalEUR += subscriptions[i].price;
//       } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.GBP) {
//         totalGBP += subscriptions[i].price;
//       }
//     }
//   };

// Funkcyjnie
export const summarizePrices = (subscriptions: Subscription[]) => {
  const initialTotal: { [key in SUBSCRIPTION_CURRENCY]: number } = {
    PLN: 0,
    EUR: 0,
    GBP: 0,
  };

  const result = subscriptions.reduce((total, subscription) => {
    total[subscription.currency] + subscription.price;

    return total;
  }, initialTotal);

  return result;
};
