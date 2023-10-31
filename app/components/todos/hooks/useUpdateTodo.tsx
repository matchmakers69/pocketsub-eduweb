"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateTodoService } from "@/service/api/todosApi";
import { SafeTodo } from "@/service/api/types";

export default function useUpdateTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const updateTodo = async ({ id, title, complete }: SafeTodo) => {
    setLoading(true);
    try {
      const updatedTodo: SafeTodo = {
        id,
        title,
        complete,
      };
      const response = await updateTodoService(updatedTodo);
      router.refresh();
      setLoading(false);
      if (response.statusText === "OK") {
        toast.success("Congrats!, Todo updated!");
      } else {
        toast.error("Something went wrong");
        setError("Update failed");
      }
    } catch (err: any) {
      console.error("Updating todo failed");
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    updateTodo,
  };
}
