/* eslint-disable @typescript-eslint/no-unused-vars */
import { Payment, SUBSCRIPTION_CURRENCY, Subscription } from "@prisma/client";
import { format } from "date-fns";
import SingleStat from "./SingleStat";
import {
  summarizePaymentsAmounts,
  summarizePrices,
} from "./utils/sumPricesByCurrency";

const EUR_GBP = 0.87;
const PLN_GBP = 0.19;

type StastProps = {
  subscriptions: (Subscription & {
    payments: Payment[];
  })[];
};

function Stats({ subscriptions }: StastProps) {
  const subscriptionsSum = summarizePrices(subscriptions);
  const paymentsAmounts = summarizePaymentsAmounts(subscriptions);
  const monthSumInGBP =
    subscriptionsSum.totalEUR * EUR_GBP +
    subscriptionsSum.totalPLN * PLN_GBP +
    subscriptionsSum.totalGBP;

  const paidSum =
    paymentsAmounts.totalEURPaid * EUR_GBP +
    paymentsAmounts.totalPLNPaid * PLN_GBP +
    paymentsAmounts.totalGBPPaid;

  const stillToPaySum =
    paymentsAmounts.totalEURNotPaid * EUR_GBP +
    paymentsAmounts.totalPLNNotPaid * PLN_GBP +
    paymentsAmounts.totalGBPNotPaid;

  return (
    <div className="col-span-3 row-start-1 row-end-2 rounded-xl bg-zinc-50 xl:col-span-2">
      <div className="mx-6 flex h-full items-center justify-between gap-6">
        <div>
          {/* // Dzisiejsza data z date.fns */}
          <h1 className="text-xl font-semibold leading-5 tracking-wide">
            {format(new Date(), "LLLL")}
          </h1>
          <p className="text-xs text-zinc-500">{format(new Date(), "yyyy")}</p>
        </div>
        <div className="flex items-center gap-6">
          <SingleStat
            sum={stillToPaySum.toFixed(2)}
            currency={SUBSCRIPTION_CURRENCY.GBP}
            subtitle="Still to pay"
          />
          <SingleStat
            sum={paidSum.toFixed(2)}
            currency={SUBSCRIPTION_CURRENCY.GBP}
            subtitle="Already paid"
          />

          <SingleStat
            sum={monthSumInGBP.toFixed(2)}
            currency={SUBSCRIPTION_CURRENCY.GBP}
            subtitle="This month total payment"
          />
        </div>
      </div>
    </div>
  );
}

export default Stats;
