import Link from "next/link";
import React from "react";

export const BlogCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link className="hover:underline" href="/blog/1">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
