import { Tag } from "@/service/api/types";
import Link from "next/link";
import React from "react";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  tag: Tag;
};

export const BlogCard = ({ id, title, content, tag }: BlogCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="mb-5">{content}</p>
        <div className="card-actions flex items-center justify-end">
          <div className="badge badge-neutral">{tag.name}</div>
          <Link className="hover:underline" href={`/blog/${id}`}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
