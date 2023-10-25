"use client";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

type AppNavLink = {
  iconName: string;
  text: string;
} & LinkProps;

function AppNavLink({ iconName, text, href }: AppNavLink) {
  // sprawdzenie url - na podstawie tego beda odczytywqne style
  const pathName = usePathname();
  const isActive =
    pathName === href || pathName === (href as UrlObject).pathname;

  return (
    <Link
      href={href}
      className={classNames(
        "flex w-full items-center gap-2 px-8 py-4",
        isActive && "border-r-4 border-zinc-400 bg-zinc-950 text-zinc-50",
      )}
    >
      <i className={`ri-${iconName}-${isActive ? "fill" : "line"}`} />
      <p className="font-semibold">{text}</p>
    </Link>
  );
}

export default AppNavLink;
