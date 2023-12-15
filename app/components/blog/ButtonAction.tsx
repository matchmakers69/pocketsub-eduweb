"use client";
import Link from "next/link";
import Button from "../buttons/Button";
import { useDeleteBlogPostQuery } from "./hooks/useDeleteBlogPostQuery";

type ButtonActionProps = {
  id: string;
};

const ButtonAction = ({ id }: ButtonActionProps) => {
  const { deletePost, isPending } = useDeleteBlogPostQuery();
  const handleDeleteBlogPost = () => {
    deletePost(id);
  };

  return (
    <div>
      <Link className="btn mr-2" href={`/blog/edit/${id}`}>
        <i className="ri-pencil-fill "></i>
        Edit
      </Link>
      <Button
        onClick={handleDeleteBlogPost}
        outline
        label={isPending ? "Deleting..." : "Delete"}
        iconName={isPending ? "loader-2-line" : "delete-bin-fill"}
        type="button"
      />
    </div>
  );
};

export default ButtonAction;
