"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { handleApiError } from "@/lib/helpers";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const router = useRouter();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/profile",
      });
      setLoading(false);

      if (!response?.error) {
        router.refresh();
        toast.success("Logged in successfully");

        return router.push("/profile");
      } else {
        toast.error("Sorry possibly bad credentials!");
        setError(response.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        handleApiError(err);
      } else {
        toast.error("Sorry possibly bad credentials!");
        setError(error);
        console.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loginUser,
  };
}
