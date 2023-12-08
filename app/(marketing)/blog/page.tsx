import { BlogCard } from "@/app/components/blog/BlogCard";

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-7xl py-6">
      <h1 className="text-2xl font-semibold">Blog articles</h1>
      <div className="mt-10 grid items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}
