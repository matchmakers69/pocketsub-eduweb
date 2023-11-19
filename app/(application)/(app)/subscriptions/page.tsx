import getSubscriptionsData from "@/app/actions/getSubscriptionsData";
import CurrentCurrencyRates from "@/app/components/currencyConvertor/CurrentCurrencyRates";
import AppContentHeader from "@/app/components/layout/AppContentHeader";
import StatsList from "@/app/components/subscriptions/StatsList";

export default async function SubscriptionsPage() {
  const data = await getSubscriptionsData("desc");

  if (!data) return null;

  return (
    <section className="h-full p-8">
      <CurrentCurrencyRates />
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Subscriptions" />
      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <div className="rounded-xl bg-zinc-50 p-6">
          <StatsList subscriptions={data} />
        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6"></div>
      </main>
    </section>
  );
}
