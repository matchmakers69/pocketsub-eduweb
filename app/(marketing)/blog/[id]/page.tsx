import ButtonAction from "@/app/components/blog/ButtonAction";
import ButtonCreate from "@/app/components/blog/ButtonCreate";
import BackButton from "@/app/components/buttons/BackButton";

const ArticleDetails = () => {
  return (
    <section className="mx-auto max-w-7xl py-6">
      <div className="mb-4 flex items-center justify-between">
        <BackButton />
        <ButtonCreate />
      </div>
      <h1 className="text-2xl font-semibold">Blog details</h1>
      <div className="mt-10 grid items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <h2 className="mb-3 text-lg font-semibold">Blog article details</h2>
      </div>
      <ButtonAction />
    </section>
  );
};

export default ArticleDetails;
