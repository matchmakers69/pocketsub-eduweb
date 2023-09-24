// Server side component

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Because middleware is created no extra need to check is required
  return (
    <main className="mx-4 px-0 text-center">
      <h1>Profile Page</h1>
      <h2>{user?.name}</h2>
    </main>
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
