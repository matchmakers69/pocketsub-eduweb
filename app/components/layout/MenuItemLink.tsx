"use client";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

type MenuItemLinkProps = {
  text: string;
} & LinkProps<unknown>;

const MenuItemLink = ({ text, href }: MenuItemLinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || pathName === (href as UrlObject).pathname;

  return (
    <Link
      href={href}
      className={classNames(
        "px-4 py-3 text-zinc-600 transition hover:bg-neutral-100",
        isActive && "font-semibold text-zinc-950",
      )}
    >
      {text}
    </Link>
  );
};

export default MenuItemLink;
