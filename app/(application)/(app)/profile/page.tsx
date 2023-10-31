// Server side component

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Because middleware is created no extra need to check is required
  return (
    <section className="container mx-auto text-center">
      <header className="mb-4">
        <h1 className="text-3xl">Profile Page</h1>
        <h2 className="text-2xl">{user?.name}</h2>
      </header>
    </section>
  );

  // if (user) {
  //   return (
  //     <main className="mx-4 px-0 text-center">
  //       <h1>Profile Page</h1>
  //       <h2>{user.name}</h2>
  //     </main>
  //   );
  // }
  // return (
  //   <main className="mx-4 px-0 text-center">
  //     <h1>Please login to see profile page</h1>
  //   </main>
  // );
}
