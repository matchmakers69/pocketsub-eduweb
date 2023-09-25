"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { registerUserService } from "@/service/api/registerApi";
import { useRouter } from "next/navigation";

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
        toast.error("Something went wrong");
        setError("Registration failed");
      }
    } catch (err: any) {
      console.error("Registration failed");
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    registerUser,
  };
}
