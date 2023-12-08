import { ExchangeRate } from "@/app/types/Currencies";
import { Subscription } from "@prisma/client";

type CategoryTotal = Record<string, number>;

const getCategoryWithTotalSum = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  const categoryTotal: CategoryTotal = data.reduce(
    (acc: Record<string, number>, currentValue) => {
      const { price, category, currency } = currentValue;
      const categoryPriceWithRateExchange =
        currency in exchangeRate
          ? price / Number(exchangeRate[currency])
          : price;

      if (category in acc) {
        acc[category] += categoryPriceWithRateExchange;
      } else {
        acc[category] = categoryPriceWithRateExchange;
      }
      return acc;
    },
    {},
  );

  return categoryTotal;
};

export const getCategoriesWithPrice = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  const categoryWithPrice = getCategoryWithTotalSum(data, exchangeRate);
  return Object.entries(categoryWithPrice).map(([name, price]) => {
    return {
      name,
      price,
    };
  });
};

export const getMostExpensiveCatagory = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  const categoriesWithPrice = getCategoriesWithPrice(data, exchangeRate);
  const mostExpensive = categoriesWithPrice.reduce((maxCategory, category) => {
    return category.price > maxCategory.price ? category : maxCategory;
  }, categoriesWithPrice[0]);

  return {
    mostExpensive,
  };
};

export const getCheapestCatagory = (
  data: Subscription[],
  exchangeRate: ExchangeRate,
) => {
  const categoriesWithPrice = getCategoriesWithPrice(data, exchangeRate);
  const cheapest = categoriesWithPrice.reduce((minCategory, category) => {
    return category.price < minCategory.price ? category : minCategory;
  }, categoriesWithPrice[0]);

  return { cheapest };
};

// Inny zapis powyzszego przykladu bez przeliczenia waluty
export const sumAllCategories = (data: Subscription[]) => {
  return data.reduce((acc: Record<string, number>, item) => {
    const { category, price } = item;
    //Sprawdzamy czy istnieje kategoria
    if (acc[category]) {
      acc[category] += price;
    } else {
      acc[category] = price;
    }

    return acc;
  }, {});
};
