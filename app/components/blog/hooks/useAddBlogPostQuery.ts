import { queryKeys } from "@/app/constants/queryKeys";
import { createBlogArticle } from "@/service/api/blogApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddBlogPostQuery = () => {
  const router = useRouter();
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBlogArticle,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.blogTagsData] });
      router.push("/blog");
      router.refresh();
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
