"use client";

import { FC } from "react";
import { IconType } from "react-icons";

type ButtonType = "button" | "submit";

interface ButtoProps {
  label: string;
  type: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<ButtoProps> = ({
  type,
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    relative
    w-full
    rounded-lg
    transition
    hover:opacity-80
    disabled:cursor-not-allowed
    disabled:opacity-70
    ${outline ? "bg-white" : "bg-yellow-500"}
    ${outline ? "border-black" : "bg-yellow-500"}
    ${outline ? "text-black" : "text-white"}
    ${small ? "py-1" : "py-3"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border-[1px]" : "border-2"}
  `}
      type={type}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
