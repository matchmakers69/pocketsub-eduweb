import getDashboardData from "@/app/actions/getDashboardData";
import CategoryBreakdown from "@/app/components/dashboard/CategoryBreakdown";
import Stats from "@/app/components/dashboard/Stats";
import AppContentHeader from "@/app/components/layout/AppContentHeader";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Image from "next/image";

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
        <Stats subscriptions={data} />
        {/* DATA TABLE */}
        <div className="col-span-3 row-start-2 row-end-3 flex flex-col rounded-xl bg-zinc-50 p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold">Upcoming payments</h2>
          <div className="relative mt-2 grow">
            <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 h-full overflow-x-auto overflow-y-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Billing period</th>
                    <th>Next payment</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="whitespace-nowrap py-4 pl-6 text-sm">
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            src={subscription.avatar_url}
                            alt={`${subscription.name} logo`}
                            className="rounded-full"
                            width={16}
                            height={16}
                          />
                          {subscription.name}
                        </div>
                      </td>
                      <td className="hidden text-sm lg:table-cell">
                        {subscription.category}
                      </td>
                      <td className="hidden text-sm lowercase xl:table-cell">
                        {subscription.billing_period}
                      </td>
                      <td className="hidden text-sm xl:table-cell">
                        {format(
                          subscription.next_payment_date,
                          "MMM dd, yyyy ",
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 pr-6 text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <p>{subscription.price}</p>
                          <p>{subscription.currency}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* GROUP STATS */}
        <CategoryBreakdown subscriptions={data} />
      </main>
    </section>
  );
}
