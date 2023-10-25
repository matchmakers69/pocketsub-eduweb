"use client";
import Button from "./Button";
import dogAvatar from "../../../public/assets/avatar.svg";
import Image from "next/image";

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
          <Image
            width={40}
            height={40}
            src={dogAvatar}
            alt="avatar"
            objectFit="cover"
          />
        </div>
        <p className="ml-2 grow text-sm font-semibold">{username}</p>
        <button>
          <i className="ri-more-2-fill" />
        </button>
      </div>
    </div>
  );
}
