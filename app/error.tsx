"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-emerald-700 dark:text-emerald-500">
          There was a problem
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {error.message ?? "Something went wrong!"}
        </h1>
        <p>Please try again</p>
      </div>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
};

export default Error;
