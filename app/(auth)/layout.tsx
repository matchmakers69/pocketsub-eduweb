import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import ClientOnly from "../components/ClientOnly";
import AuthNavbar from "../components/layout/AuthNavbar";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <ClientOnly>
        <AuthNavbar />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
