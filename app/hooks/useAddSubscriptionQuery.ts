import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSubscription } from "../actions/addSubscription";

export const useAddSubscriptionQuery = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: addSubscription,
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
