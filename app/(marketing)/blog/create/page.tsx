"use client";
import FormBlog from "@/app/components/blog/FormBlog";
import { useAddBlogPostQuery } from "@/app/components/blog/hooks/useAddBlogPostQuery";
import { useFetchTagsQuery } from "@/app/components/blog/hooks/useFetchTagsQuery";
import { TBlogPostValue } from "@/app/components/blog/types/blogPostValues";
import BackButton from "@/app/components/buttons/BackButton";
import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

const CreateArticle = () => {
  const { isLoading, tags = [] } = useFetchTagsQuery();
  const { mutation } = useAddBlogPostQuery();
  const handleCreateArticleSubmit: SubmitHandler<TBlogPostValue> = useCallback(
    (data) => {
      mutation.mutate({
        title: data.title,
        content: data.content,
        tagId: data.tag,
      });
    },
    [mutation],
  );

  if (isLoading) return <div>Tags are loading...</div>;

  return (
    <section className="mx-auto max-w-7xl py-6">
      <div className="mb-4 flex justify-end">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">
        Fill the from below to add new article
      </h1>
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
            <FormBlog tags={tags} submit={handleCreateArticleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateArticle;
