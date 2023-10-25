"use client";

import { useSession, signOut } from "next-auth/react";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

function AuthNavbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href={"/"}>
              <Logo width={50} height={50} />
            </Link>
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
                    <button
                      onClick={() =>
                        signOut({
                          redirect: true,
                          callbackUrl: `${window.location.origin}/login`,
                        })
                      }
                      className="bg-red-700 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default AuthNavbar;
