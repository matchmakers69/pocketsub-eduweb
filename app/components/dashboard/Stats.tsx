/* eslint-disable @typescript-eslint/no-unused-vars */
import { SUBSCRIPTION_CURRENCY, Subscription } from "@prisma/client";
import { format } from "date-fns";
import SingleStat from "./SingleStat";

const summarizePrices = (subscriptions: Subscription[]) => {
  let totalEUR = 0;
  let totalGBP = 0;
  let totalPLN = 0;
  for (let i = 0; i < subscriptions.length; i = i + 1) {
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
      totalPLN += subscriptions[i].price;
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
      totalEUR += subscriptions[i].price;
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.GBP) {
      totalGBP += subscriptions[i].price;
    }
  }
};

function Stats() {
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
        <SingleStat
          sum={36.6}
          currency={SUBSCRIPTION_CURRENCY.GBP}
          subtitle={`Paid in ${format(new Date(), "LLLL")}`}
        />
      </div>
    </div>
  );
}

export default Stats;
