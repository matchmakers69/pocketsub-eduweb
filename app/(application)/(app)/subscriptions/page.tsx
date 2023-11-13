import getSubscriptionsData from "@/app/actions/getSubscriptionsData";
import AppContentHeader from "@/app/components/layout/AppContentHeader";
import SingleStat from "@/app/components/subscriptions/SingleStat";
import {
  calculateMostExpensiveSubscription,
  calculateTheCheapestSubscription,
  //getSubscriptionsStats,
} from "@/app/components/subscriptions/utils/calculateSubscriptions";

export default async function SubscriptionsPage() {
  const data = await getSubscriptionsData("desc");

  if (!data) return null;

  //const stats = getSubscriptionsStats(data);

  const mostExpensiveSubscription = calculateMostExpensiveSubscription(data);
  const theCheapestSubscription = calculateTheCheapestSubscription(data);

  console.log(theCheapestSubscription, "theCheapestSubscription");

  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Subscriptions" />
      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <div className="rounded-xl bg-zinc-50 p-6">
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
        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6"></div>
      </main>
    </section>
  );
}
