"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

function Avatar({ src }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      height="25"
      width="25"
      alt="Avatar"
      src={src ?? "/assets/avatar.svg"}
    />
  );
}

export default Avatar;
