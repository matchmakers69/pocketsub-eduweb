"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="h-20 bg-white">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link className="text-ct-dark-600" href="/">
            Next eduweb
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: `${window.location.origin}/login`,
                    })
                  }
                  className="bg-red-700 text-white"
                >
                  Sign out
                </button>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
