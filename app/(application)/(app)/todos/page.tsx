import getTodos from "@/app/actions/getTodos";
import TodosList from "@/app/components/todos/TodosList";
import Link from "next/link";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <section className="container mx-auto text-center">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Todos</h1>
        <Link
          className="rounded border border-zinc-900 px-2 py-1 text-zinc-900 outline-none focus-within:bg-slate-700 hover:bg-slate-700 hover:text-zinc-100"
          href="/todos/new"
        >
          New
        </Link>
      </div>
      <TodosList todos={todos} />
    </section>
  );
}
