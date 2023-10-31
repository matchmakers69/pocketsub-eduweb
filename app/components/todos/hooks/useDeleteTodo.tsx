"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteTodoService } from "@/service/api/todosApi";

export default function useDeleteTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const deleteTodo = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteTodoService(id);
      router.refresh();
      setLoading(false);
      if (response.statusText === "OK") {
        toast.success("Congrats!, Todo deleted!");
      } else {
        toast.error("Something went wrong");
        setError("Delete failed");
      }
    } catch (err: any) {
      console.error("Deleting todo failed");
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    deleteTodo,
  };
}
