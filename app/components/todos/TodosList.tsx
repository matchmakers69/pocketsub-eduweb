"use client";

import { SafeTodo } from "@/service/api/types";
import TodoItem from "./TodoItem";
import { useState } from "react";

type TodosListProps = {
  todos: SafeTodo[];
};

function TodosList({ todos }: TodosListProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  const handleEditTodo = (id: string) => {
    setEditTodoId(id);
  };

  const handleCancelEditTodo = () => {
    setEditTodoId(null);
  };

  return (
    <>
      <ul className="mb-3 pl-4">
        {todos.map((todo) => (
          <TodoItem
            isEditing={editTodoId === todo.id}
            onEdit={handleEditTodo}
            onCancel={handleCancelEditTodo}
            key={todo.id}
            {...todo}
          />
        ))}
      </ul>
    </>
  );
}

export default TodosList;
