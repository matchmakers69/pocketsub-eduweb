import { queryKeys } from "@/app/constants/queryKeys";
import { fetchSinglePost } from "@/service/api/blogApi";
import { useFlagsStore } from "@/src/flagsStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useFetchSinglePostQuery = (id: string) => {
  const { setToast, toast: flagToast } = useFlagsStore();
  const flagToastShown = flagToast.singleBlogPostSuccess;

  const {
    data: singlePost,
    error,
    isLoading: loadingSinglePost,
  } = useQuery({
    queryKey: [queryKeys, id],
    queryFn: () => fetchSinglePost(id),

    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching single post");
    }
  }, [error]);

  useEffect(() => {
    if (singlePost) {
      if (!flagToastShown) {
        toast.success("Fetched single post successfully");
        setToast("singleBlogPostSuccess", true);
      }
    }
  }, [singlePost, flagToastShown, setToast]);

  return {
    singlePost,
    loadingSinglePost,
  };
};
