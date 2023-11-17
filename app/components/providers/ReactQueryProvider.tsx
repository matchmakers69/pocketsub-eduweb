"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
