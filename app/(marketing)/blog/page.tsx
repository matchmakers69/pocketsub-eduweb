import getBlogPosts from "@/app/actions/getBlogArticles";
import { BlogCard } from "@/app/components/blog/BlogCard";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  if (!blogPosts) return;
  return (
    <section className="mx-auto max-w-7xl py-6">
      <h1 className="text-2xl font-semibold">Blog articles</h1>
      <div className="mt-10 grid items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((article) => (
          <BlogCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
}
