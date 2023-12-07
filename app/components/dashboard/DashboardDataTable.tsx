"use client";

import { Payment, Subscription } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import getSubscriptionsData from "@/app/actions/getSubscriptionsData";

type DashboardDataTableProps = {
  initialData: (Subscription & {
    payments: Payment[];
  })[];
};

const DashboardDataTable = ({ initialData }: DashboardDataTableProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const { data: subscriptionsData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    initialData,
    queryFn: () =>
      getSubscriptionsData(userId!, { key: "next_payment_date", value: "asc" }),
  });

  if (isLoading) return <div>Dashboard data is loading from client...</div>;

  return (
    <div className="col-span-3 row-start-2 row-end-3 flex flex-col rounded-xl bg-zinc-50 p-6 xl:col-span-2">
      <h2 className="text-lg font-semibold">Upcoming payments</h2>
      <div className="relative mt-2 grow">
        <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 h-full overflow-x-auto overflow-y-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pl-6 pr-3 text-left text-sm font-light text-zinc-400 backdrop-blur backdrop-filter">
                  Name
                </th>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-400 backdrop-blur backdrop-filter">
                  Category
                </th>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-400 backdrop-blur backdrop-filter">
                  Billing period
                </th>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-400 backdrop-blur backdrop-filter">
                  Next payment
                </th>
                <th className="text-text-right sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-sm font-light text-zinc-400 backdrop-blur backdrop-filter">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptionsData.map((subscription) => (
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
                    {format(subscription.next_payment_date, "MMM dd, yyyy ")}
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
  );
};

export default DashboardDataTable;
