import { queryKeys } from "@/app/constants/queryKeys";
import { ExchangeRates } from "@/app/types/Currencies";
import { CURRENCIES_API } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useFetchCurrenciesQuery = () => {
  const getCurrencyDataFn = async () => {
    const response = await fetch(CURRENCIES_API);
    const result: ExchangeRates = await response.json();
    return result.data;
  };

  const {
    data: currencies,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.currencies],
    queryFn: getCurrencyDataFn,
    select: (data) => {
      if (!data) return [];
      return Object.entries(data).map(([label, value]) => ({
        label,
        value,
      }));
    },
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching currency options");
    }
  }, [error]);

  useEffect(() => {
    if (currencies && currencies.length > 0) {
      // toast.success("Fetched data successfully");
      // Possibly set data to redux
      //setCurrencyOptions(currencies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  return {
    currencies,
    isLoading,
  };
};
