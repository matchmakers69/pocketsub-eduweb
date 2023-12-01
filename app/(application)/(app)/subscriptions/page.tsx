import getSubscriptionsData from "@/app/actions/getSubscriptionsData";
import CurrentCurrencyRates from "@/app/components/currencyConvertor/CurrentCurrencyRates";
import AppContentHeader from "@/app/components/layout/AppContentHeader";
import Image from "next/image";
import { format } from "date-fns";
import StatsList from "@/app/components/subscriptions/StatsList";
import { PAYMENT_STATUS } from "@prisma/client";

export default async function SubscriptionsPage() {
  const data = await getSubscriptionsData("desc");

  if (!data) return null;

  return (
    <section className="h-full px-8 pb-14 pt-8 ">
      <CurrentCurrencyRates />
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Subscriptions" />
      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <div className="rounded-xl bg-zinc-50 p-6">
          <StatsList subscriptions={data} />
        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold">Subscriptions</h2>
          <div className="relative mt-2 grow">
            <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 overflow-x-auto overflow-y-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pl-6 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Name
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Category
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Billing period
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Next payment
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Payment status
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-right text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      Cost
                    </th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((subscription) => {
                    return (
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
                        <td className="whitespace-nowrap py-4 text-sm">
                          {format(
                            subscription.next_payment_date,
                            "MMM dd, yyyy ",
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm">
                          {subscription.payments[0].status ===
                          PAYMENT_STATUS.PAID ? (
                            <div className="flex items-center gap-2">
                              <i className="ri-checkbox-circle-fill text-green-600"></i>
                              <p>paid</p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <i className="ri-indeterminate-circle-fill text-red-600"></i>
                              <p>not paid</p>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 pr-6 text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <p>{subscription.price}</p>
                            <p>{subscription.currency}</p>
                          </div>
                        </td>
                        <td>
                          <button className="flex items-center rounded-md bg-zinc-200 px-2 text-zinc-700">
                            <i className="ri-pencil-line mr-1 text-lg"></i>
                            <p>
                              Edit{" "}
                              <span className="sr-only">
                                {subscription.name}
                              </span>
                            </p>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
