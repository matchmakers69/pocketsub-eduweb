"use client";

import Image from "next/image";
import LogoSrc from "../../../public/assets/next-js.svg";

type LogoProps = {
  width?: string | number;
  height?: string | number;
};

function Logo({ width = 50, height = 50 }: LogoProps) {
  return (
    <div
      className="relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        src={LogoSrc}
        alt="logo"
        className="hidden cursor-pointer md:block"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default Logo;
