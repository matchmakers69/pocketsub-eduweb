import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/layout/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Alternative way to get user from useSession hook used on Profile page for example
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <Navbar currentUser={currentUser} />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
