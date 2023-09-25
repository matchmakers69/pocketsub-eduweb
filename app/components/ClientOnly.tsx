"use client";

import { ReactNode, useEffect, useState } from "react";

interface ClientOnlyProp {
  children: ReactNode;
}

function ClientOnly({ children }: ClientOnlyProp) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default ClientOnly;
