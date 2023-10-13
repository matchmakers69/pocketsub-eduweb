import { ReactNode } from "react";

export type BaseProps<T = ReactNode> = {
  children?: T;
  id?: string;
  "data-testid"?: string;
};
