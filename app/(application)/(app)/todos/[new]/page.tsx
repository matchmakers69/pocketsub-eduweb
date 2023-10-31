import CreateTodoForm from "@/app/components/todos/CreateTodoForm";

export default async function NewTodoPage() {
  return (
    <section className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
            <h1 className="mb-6 text-center text-xl font-semibold">
              Create todo
            </h1>
            <CreateTodoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
