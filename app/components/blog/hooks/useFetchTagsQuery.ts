import { queryKeys } from "@/app/constants/queryKeys";
import { fetchTags } from "@/service/api/blogApi";
import { useFlagsStore } from "@/src/flagsStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useFetchTagsQuery = () => {
  const { setToast, toast: flagToast } = useFlagsStore();
  const flagToastShown = flagToast.tagsBlogPostSuccess;

  const {
    data: tags,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.blogTagsData],
    queryFn: fetchTags,
    select: (data) => {
      if (!data) return [];
      return data.map((tag) => ({
        label: tag.name,
        value: tag.id,
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
    if (tags) {
      if (!flagToastShown) {
        toast.success("Fetched data successfully");
        setToast("tagsBlogPostSuccess", true);
      }
    }
  }, [tags, flagToastShown, setToast]);

  return {
    tags,
    isLoading,
  };
};
