"use client";

import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/assets/next-js.svg"
      width="50"
      height="50"
      alt="logo"
      className="hidden cursor-pointer md:block"
    />
  );
}

export default Logo;
