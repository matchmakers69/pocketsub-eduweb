import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Logo from "../components/layout/Logo";
import AppNavLink from "../components/buttons/AppNavLink";
import AppUserButton from "../components/buttons/AppUserButton";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className={`flex h-full ${inter.className}`}>
      <aside className="flex w-64 flex-col justify-between">
        <div>
          <Link
            href={"/"}
            className="flex items-center justify-start gap-2 p-8"
          >
            <Logo width={30} height={30} />
            <h1 className="text-lg font-semibold">pocketsub</h1>
          </Link>
          <nav className="flex flex-col">
            <AppNavLink
              href={"/dashboard"}
              iconName="dashboard"
              text={"Dashboard"}
            />
            <AppNavLink
              href={"/profile"}
              iconName="account-circle"
              text={"Profile"}
            />
            <AppNavLink
              href={"/subscriptions"}
              iconName="file-text"
              text={"Subscriptions"}
            />
          </nav>
        </div>
        <AppUserButton username={user?.name ?? "Logged out"} />
      </aside>
      <main className="max-h-screen grow overflow-hidden bg-zinc-200">
        {children}
      </main>
    </div>
  );
}
