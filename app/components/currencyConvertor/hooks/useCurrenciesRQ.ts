/* eslint-disable @typescript-eslint/no-unused-vars */
import { queryKeys } from "@/app/constants/queryKeys";
import { ExchangeRate, ExchangeRates } from "@/app/types/Currencies";
import { CURRENCIES_API } from "@/config/api";
import { useCurrencyStore } from "@/src/currencyStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useFetchCurrenciesQuery = () => {
  const { setCurrencyRate } = useCurrencyStore();
  const getCurrencyDataFn = async () => {
    const response = await fetch(CURRENCIES_API);
    const result: ExchangeRates = await response.json();

    return result.data;
  };

  const {
    data: currencyRate,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.currencyRate],
    queryFn: getCurrencyDataFn,

    // select: (data) => {
    //   if (!data) return [];
    //   return Object.entries(data).map(([label, value]) => ({
    //     label,
    //     value,
    //   }));
    // },
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching currency options");
    }
  }, [error]);

  useEffect(() => {
    if (currencyRate) {
      setCurrencyRate(currencyRate);

      toast.success("Fetched data successfully", { id: "1" });
    }
  }, [currencyRate, setCurrencyRate]);

  return {
    currencyRate,
    isLoading,
  };
};
