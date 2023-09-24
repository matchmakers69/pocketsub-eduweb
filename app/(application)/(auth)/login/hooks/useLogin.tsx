"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const router = useRouter();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      setLoading(false);

      if (!response?.error) {
        router.refresh(); // TODO check if that works and what is its purpose
        router.push(callbackUrl);
      } else {
        // Posibly show toast message
        console.log("Something went wrong with your login!");
        setError(response.error);
      }
    } catch (err: any) {
      console.error("Login failed");
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    loginUser,
  };
}
