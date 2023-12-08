import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../buttons/Button";
import Input from "../formElements/Input";
import useUpdateTodo from "./hooks/useUpdateTodo";
import useDeleteTodo from "./hooks/useDeleteTodo";

type UpdateTodoFormProps = {
  id: string;
  title: string;
  complete: boolean;
  onCancel: () => void;
  // onEditTodo: (id: string, title: string, complete: boolean) => void;
};

type TodoFormData = {
  title: string;
  complete: boolean;
};

function UpdateTodoForm({
  title,
  complete,
  id,
  onCancel, // onEditTodo,
}: UpdateTodoFormProps) {
  const { loading, updateTodo } = useUpdateTodo();
  const { deleteTodo, loading: deleteLoading } = useDeleteTodo();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<TodoFormData>({
    mode: "onChange",
    defaultValues: {
      title,
      complete,
    },
  });
  const handleSubmitUpdateTodo: SubmitHandler<TodoFormData> = async (data) => {
    // onEditTodo(id, data.title, data.complete);
    const updatedTodo = {
      id,
      title: data.title,
      complete: data.complete,
    };

    await updateTodo(updatedTodo);
    onCancel();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(id);
    onCancel();
  };
  return (
    <>
      <Input
        id={`edit-${id}`}
        name="title"
        type="text"
        register={register}
        required
      />
      <Input
        id={`select-${id}`}
        name="complete"
        type="checkbox"
        register={register}
      />
      <Button outline onClick={onCancel} label="Cancel" type="button" small />
      <Button
        onClick={handleSubmit(handleSubmitUpdateTodo)}
        label={loading ? "Loading" : "Update"}
        type="submit"
        small
        disabled={!isDirty || !isValid || isSubmitting}
      />
      <Button
        disabled={deleteLoading}
        outline
        onClick={handleDeleteTodo}
        label={deleteLoading ? "Deleting" : "Delete"}
        type="button"
        small
      />
    </>
  );
}

export default UpdateTodoForm;
