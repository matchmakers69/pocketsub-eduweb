// Server side component

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <main className="mx-4 px-0 text-center">
      <h1>Profile Page</h1>
      <h2>{user && user?.name ? user.name : "not loggedIn"}</h2>
    </main>
  );
}
