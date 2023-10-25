import ClientOnly from "../components/ClientOnly";
import AuthNavbar from "../components/layout/AuthNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientOnly>
        <AuthNavbar />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
