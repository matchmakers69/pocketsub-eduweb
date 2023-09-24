import Header from "@/app/components/Header";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
          <div className="lg:w5/12 bg-white px-8 py-10 md:w-8/12">
            <div className="max-w-2x1 w-full rounded-md border bg-white p-6">
              <h1 className="text-center text-xl font-semibold">Login form</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}