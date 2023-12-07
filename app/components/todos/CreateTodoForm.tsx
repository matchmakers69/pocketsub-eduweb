"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/buttons/Button";
import useCreateTodo from "./hooks/useCreateTodo";
import { collectFormErrors } from "@/app/utils/collectFormErrors";
import FormErrors from "../formElements/FormErrors";

type TTodoFormValues = {
  id: string;
  title: string;
  complete: boolean;
};

function CreateTodoForm() {
  const { createTodo, loading } = useCreateTodo();
  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<TTodoFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      complete: false,
    },
  });
  const handleCreateTodo: SubmitHandler<TTodoFormValues> = async (newTodo) => {
    createTodo(newTodo);
  };

  const formErrorsMessage = collectFormErrors(errors);
  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleCreateTodo)}>
        <FormErrors errors={formErrorsMessage as string[]} />
        <div className="mb-5 flex flex-col gap-1">
          <Input<TTodoFormValues>
            name="title"
            id="title"
            label="Title"
            register={register}
            type="text"
            required
          />
        </div>
        <div className="mb-4 flex justify-end gap-1">
          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            label={loading ? "Loading" : "Create"}
          />
        </div>
      </form>
    </>
  );
}

export default CreateTodoForm;
