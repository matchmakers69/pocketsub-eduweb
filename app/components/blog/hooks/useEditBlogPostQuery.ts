import { queryKeys } from "@/app/constants/queryKeys";
import { updateBlogArticle } from "@/service/api/blogApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BlogPost } from "@/service/api/types";

export const useEditBlogPostQuery = (id: string) => {
  const router = useRouter();
  const client = useQueryClient();
  const { isPending: isLoadingUpdate, mutate: updateBlogPost } = useMutation({
    mutationFn: (newPost: BlogPost) => updateBlogArticle(id, newPost),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.blogPosts] });
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
    updateBlogPost,
    isLoadingUpdate,
  };
};
