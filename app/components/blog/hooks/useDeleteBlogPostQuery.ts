import { queryKeys } from "@/app/constants/queryKeys";
import { deleteBlogArticle } from "@/service/api/blogApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteBlogPostQuery = () => {
  const router = useRouter();
  const client = useQueryClient();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: deleteBlogArticle,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.blogPosts] });
      router.push("/blog");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      if (error) {
        toast.error("New subscription cannot be deleted!");
      }
    },
  });

  return {
    deletePost,
    isPending,
  };
};
