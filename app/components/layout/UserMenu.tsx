"use client";

import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { SafeUser } from "@/service/api/types";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleToggleDropDownMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={() => undefined}
        >
          Pockethub - Next.js v13
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-4 rounded-full border-[1px] border-neutral-200 p-8 transition hover:shadow-md md:px-2 md:py-1"
          onClick={handleToggleDropDownMenu}
        >
          <i className="ri-menu-line"></i>
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/dashboard")}
                  label="Dashboard"
                />
                <MenuItem
                  onClick={() => router.push("/profile")}
                  label="Profile"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => router.push("/login")} label="Login" />
                <MenuItem
                  onClick={() => router.push("/register")}
                  label="Register"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
