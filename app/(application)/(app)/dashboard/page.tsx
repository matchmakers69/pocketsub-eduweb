import getDashboardData from "@/app/actions/getDashboardData";
import Stats from "@/app/components/dashboard/Stats";
import AppContentHeader from "@/app/components/layout/AppContentHeader";

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) return null;
  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />
      {/* CONTENT */}
      {/* grid-rows-[80px,_1fr] - sprawi ze pierwszy rzad bedzie mial stala wysokosc 80px a drugi reszte dostepnej wysokosci */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-6 py-6">
        {/* STATS */}
        <Stats />
        {/* DATA TABLE */}
        <div className="col-span-3 row-start-2 row-end-3 flex flex-col rounded-xl bg-zinc-50 p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold">Upcoming payments</h2>
        </div>
        {/* GROUP STATS */}
        <div className="row-span-2 hidden rounded-xl bg-zinc-50 xl:flex">
          dewfcovewo
        </div>
      </main>
    </section>
  );
}
