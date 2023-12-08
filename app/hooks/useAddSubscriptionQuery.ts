import { createSubscription } from "@/service/api/subscriptionsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddSubscriptionQuery = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dashboardData"] });
    },
    onError: (error) => {
      console.error(error);
      if (error) {
        toast.error("New subscription cannot be added!");
      }
    },
  });

  return {
    mutation,
  };
};
