import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubscriptionsData from "@/app/actions/getSubscriptionsData";
import CurrentCurrencyRates from "@/app/components/currencyConvertor/CurrentCurrencyRates";
import CategoryBreakdown from "@/app/components/dashboard/CategoryBreakdown";
import DashboardDataTable from "@/app/components/dashboard/DashboardDataTable";
import Stats from "@/app/components/dashboard/Stats";
import AppContentHeader from "@/app/components/layout/AppContentHeader";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  const data = await getSubscriptionsData(currentUser?.id, {
    key: "next_payment_date",
    value: "asc",
  });

  if (!data) return null;
  // const restObj = useRates.getState().rates;

  return (
    <section className="h-full px-8 pb-14 pt-8 ">
      <CurrentCurrencyRates />
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />
      {/* CONTENT */}
      {/* grid-rows-[80px,_1fr] - sprawi ze pierwszy rzad bedzie mial stala wysokosc 80px a drugi reszte dostepnej wysokosci */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-6 py-6">
        {/* STATS */}
        <Stats subscriptions={data} />
        {/* DATA TABLE */}

        <DashboardDataTable initialData={data} />
        {/* GROUP STATS */}
        <CategoryBreakdown subscriptions={data} />
      </main>
    </section>
  );
}
