"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createTodoService } from "@/service/api/todosApi";
import { SafeTodo } from "@/service/api/types";

export default function useCreateTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const createTodo = async ({ title }: SafeTodo) => {
    setLoading(true);
    try {
      const newTodo: SafeTodo = {
        id: "",
        title,
        complete: false,
      };
      const response = await createTodoService(newTodo);
      setLoading(false);
      router.refresh();
      if (response.statusText === "OK") {
        router.push("/todos");
      } else {
        toast.error("Something went wrong");
        setError("Creation failed");
      }
    } catch (err: any) {
      console.error("Creation todo failed");
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    createTodo,
  };
}
