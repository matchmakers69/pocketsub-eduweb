"use client";
import FormBlog from "@/app/components/blog/FormBlog";
import { TBlogPostValue } from "@/app/components/blog/types/blogPostValues";
import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

const EditBlogArticle = () => {
  const handleSaveUpdateArticleSubmit: SubmitHandler<TBlogPostValue> =
    useCallback((data) => {
      console.log(data);
    }, []);

  return (
    <section className="mx-auto max-w-7xl py-6">
      <h1 className="text-2xl font-semibold">Edit article</h1>
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
            <FormBlog isEditing submit={handleSaveUpdateArticleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditBlogArticle;
