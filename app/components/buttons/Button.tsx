import { forwardRef, ForwardedRef, ReactNode } from "react";

type ButtonType = "button" | "submit";

interface ButtonProps {
  label: string;
  type: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  iconName?: string;
  children?: ReactNode;
}

const Button = forwardRef(
  (
    {
      type,
      label,
      onClick,
      disabled,
      outline,
      small,
      iconName,
      fullWidth,
      children,
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`
          relative
          ${fullWidth && "w-full"}
          rounded-lg
          border
          transition
          hover:opacity-80
          disabled:cursor-not-allowed
          disabled:opacity-40
          ${outline ? "bg-white" : "bg-zinc-950"}
          ${outline ? "border-black" : "bg-zinc-950"}
          ${outline ? "text-black" : "text-white"}
          ${small ? "py-1" : "py-3"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "font-light" : "font-medium"}
          ${iconName ? "pl-4" : "pl-6"}
          ${iconName ? "pr-6" : "pr-8"}
        `}
        type={type}
      >
        {iconName && <i className={`ri-${iconName}`} />}
        {label}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
