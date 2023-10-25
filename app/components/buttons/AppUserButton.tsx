"use client";
import Button from "./Button";
import userAvatar from "../../../public/assets/avatar.svg";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

type AppUserButtonProps = {
  username: string;
};

export default function AppUserButton({ username }: AppUserButtonProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 divide-y-[1px] divide-zinc-300">
      <div>
        <p className="mb-2 text-center">Add new subscription?</p>
        <Button label="New subscription" iconName="add-line" type="button" />
      </div>
      <div className="flex w-full items-center px-4 py-4">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image width={40} height={40} src={userAvatar} alt="avatar" />
        </div>
        <p className="ml-2 grow text-sm font-semibold">{username}</p>
        <div role="button">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <i className="ri-more-2-fill" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[220px] rounded-md bg-zinc-50 p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
                <DropdownMenu.Item>
                  <span
                    role="button"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                  >
                    Logout
                  </span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
