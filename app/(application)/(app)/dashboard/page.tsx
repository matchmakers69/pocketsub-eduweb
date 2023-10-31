import getDashboardData from "@/app/actions/getDashboardData";
import AppContentHeader from "@/app/components/layout/AppContentHeader";

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) return null;
  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />
      {/* CONTENT */}
    </section>
  );
}
