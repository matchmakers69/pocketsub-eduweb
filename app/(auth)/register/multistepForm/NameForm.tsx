"use client";

import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegistrationFormContext } from "@/app/context/RegistrationFormContext";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { nameSchema } from "./schema/nameSchema";

type TFormValues = {
  UsernameStep: {
    name: string;
  };
};

function NameForm() {
  const { goNext, setFormValues, formDataValues, markStepAsCompleted } =
    useRegistrationFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<TFormValues>({
    mode: "onChange",
    resolver: yupResolver(nameSchema),
    defaultValues: {
      UsernameStep: {
        name: formDataValues.UsernameStep.name,
      },
    },
  });

  const handleSaveName: SubmitHandler<TFormValues> = (data) => {
    setFormValues(data);
    markStepAsCompleted("name");
    goNext();
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSaveName)}>
      <div className="mb-5 flex flex-col gap-1">
        <Input<TFormValues>
          name="UsernameStep.name"
          id="name"
          label="Name"
          register={register}
          errors={errors as Partial<{ UsernameStep: { name: FieldError } }>}
          type="text"
          required
        />
      </div>

      <div className="flex justify-end gap-1">
        <Button
          label={"Next"}
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        />
      </div>
    </form>
  );
}

export default NameForm;
