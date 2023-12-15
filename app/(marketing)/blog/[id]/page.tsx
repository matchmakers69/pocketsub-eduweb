import getBlogArticle from "@/app/actions/getSingleBlogArticle";
import ButtonAction from "@/app/components/blog/ButtonAction";
import BackButton from "@/app/components/buttons/BackButton";

type ArticleDetailsProps = {
  params: {
    id: string;
  };
};

const ArticleDetails = async ({ params }: ArticleDetailsProps) => {
  const article = await getBlogArticle(params.id);
  if (!article) return;
  return (
    <section className="mx-auto max-w-7xl py-6">
      <div className="mb-4 flex items-center justify-end">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Article details</h1>
      <div className="mb-5 mt-10">
        <h2 className="mb-3 text-lg font-semibold">{article.title}</h2>
        <p className="mb-3 text-slate-700">{article.content}</p>
        <div className="badge badge-neutral">{article.tag.name}</div>
      </div>
      <ButtonAction id={params.id} />
    </section>
  );
};

export default ArticleDetails;
