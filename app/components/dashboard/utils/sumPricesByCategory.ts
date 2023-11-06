import { Subscription } from "@prisma/client";

const exchangeRate: Record<string, number> = {
  EUR: 0.87,
  PLN: 0.19,
  GBP: 1,
};

type CategoryTotal = Record<string, number>;

export const getCategoryWithTotalSum = (data: Subscription[]) => {
  const categoryTotal: CategoryTotal = data.reduce(
    (acc: Record<string, number>, currentValue) => {
      const { price, category, currency } = currentValue;
      const categoryPriceWithRateExchange =
        currency in exchangeRate ? price * exchangeRate[currency] : price;

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

export const getCategoriesWithPrice = (data: Subscription[]) => {
  const categoryWithPrice = getCategoryWithTotalSum(data);
  return Object.entries(categoryWithPrice).map(([name, price]) => {
    return {
      name,
      price,
    };
  });
};

export const getMostExpensiveCatagory = (data: Subscription[]) => {
  const categoriesWithPrice = getCategoriesWithPrice(data);
  const mostExpensive = categoriesWithPrice.reduce((maxCategory, category) => {
    return category.price > maxCategory.price ? category : maxCategory;
  }, categoriesWithPrice[0]);

  return {
    mostExpensive,
  };
};

export const getCheapestCatagory = (data: Subscription[]) => {
  const categoriesWithPrice = getCategoriesWithPrice(data);
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
