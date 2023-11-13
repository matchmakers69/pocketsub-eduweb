"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { registerUserService } from "@/service/api/registerApi";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/helpers/errors/handleApiError";

export default function useReister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    try {
      const response = await registerUserService(name, email, password);
      setLoading(false);
      if (response.statusText === "OK") {
        router.push("/login");
      } else {
        toast.error("Upss...someting went wrong with registration");
        setError("Registration failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        handleApiError(err);
      } else {
        toast.error("Sorry possibly bad credentials!");
        setError(error);
        console.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registerUser,
  };
}
