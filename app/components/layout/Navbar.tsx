"use client";

import { SafeUser } from "@/service/api/types";
import Container from "./Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Link from "next/link";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
  return (
    <nav className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href={"/"}>
              <Logo width={50} height={50} />
            </Link>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
