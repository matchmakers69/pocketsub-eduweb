"use client";

import { Payment, Subscription } from "@prisma/client";
import {
  getCategoriesWithPrice,
  getCheapestCatagory,
  getMostExpensiveCatagory,
} from "./utils/sumPricesByCategory";
import { useCurrencyStore } from "@/src/currencyStore";

type CategoryBreakdownProps = {
  subscriptions: (Subscription & {
    payments: Payment[];
  })[];
};

function CategoryBreakdown({ subscriptions }: CategoryBreakdownProps) {
  const { exchangeRate } = useCurrencyStore();
  const categoriesWithPrice = getCategoriesWithPrice(
    subscriptions,
    exchangeRate ?? {},
  );
  const mostExpensiveCategory = getMostExpensiveCatagory(
    subscriptions,
    exchangeRate ?? {},
  );
  const cheapestCategory = getCheapestCatagory(
    subscriptions,
    exchangeRate ?? {},
  );

  const { cheapest } = cheapestCategory;
  const { mostExpensive } = mostExpensiveCategory;
  return (
    <div className="row-span-2 hidden flex-col rounded-xl bg-zinc-50 p-6 xl:flex">
      <h2 className="text-lg font-semibold">Category breakdown</h2>
      <div className="relative mt-2 w-full grow">
        <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 h-full">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-left text-sm font-light text-zinc-400">
                  Category
                </th>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-right text-sm font-light text-zinc-400">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesWithPrice.map((category) => {
                return (
                  <tr key={category.name}>
                    <td className="whitespace-nowrap px-6 py-2 text-sm">
                      <p>{category.name}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 text-right font-semibold">
                      {category.price.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Most expensive category
          </h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{mostExpensive.name}</h4>
            <p className="font-semibold text-zinc-950">
              {mostExpensive.price.toFixed(2)}
              <span className="ml-1 text-[8px] uppercase">GBP</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Cheapest category</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{cheapest.name}</h4>
            <p className="font-semibold text-zinc-950">
              {cheapest.price.toFixed(2)}
              <span className="ml-1 text-[8px] uppercase">GBP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBreakdown;
