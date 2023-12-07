import { useEffect, useRef } from "react";

type FormErrorsProps = {
  errors: string[];
};

const FormErrors = ({ errors }: FormErrorsProps) => {
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorSummaryRef.current) {
      errorSummaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div
      ref={errorSummaryRef}
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
    >
      <strong className="font-bold">Oops! There was an error:</strong>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrors;
