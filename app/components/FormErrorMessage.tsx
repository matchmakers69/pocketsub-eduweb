import classNames from "classnames";
import { ReactNode } from "react";
type FormErrorMessageProps = {
  className?: string;
  children: ReactNode;
};

function FormErrorMessage({ className, children }: FormErrorMessageProps) {
  return (
    <p
      className={classNames(
        "block text-left font-serif text-sm text-red-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default FormErrorMessage;
