"use client";

import { SafeTodo } from "@/service/api/types";
import Button from "../buttons/Button";
import TodoEditMode from "./TodoEditMode";

type TodosListProps = {
  isEditing: boolean;
  onEdit: (id: string) => void;
  onCancel: () => void;
} & SafeTodo;

function TodoItem({
  id = "",
  title,
  complete,
  isEditing,
  onEdit,
  onCancel,
}: TodosListProps) {
  const handleEditClick = () => {
    onEdit(id);
  };

  return (
    <li className="flex items-center gap-3">
      {isEditing ? (
        <div className="mb-5 flex gap-2">
          <TodoEditMode
            id={id}
            title={title}
            complete={complete}
            onCancel={onCancel}
            // onEditTodo={onEditTodo}
          />
        </div>
      ) : (
        <>
          <p className="cursor-pointer text-slate-500">{title}</p>
          <Button
            small
            outline
            type="button"
            label="Edit"
            onClick={handleEditClick}
          />
        </>
      )}
    </li>
  );
}

export default TodoItem;
