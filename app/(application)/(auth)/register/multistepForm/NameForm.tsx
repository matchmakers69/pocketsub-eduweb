"use client";

import Input from "@/app/components/Input";
import Button from "@/app/components/buttons/Button";
import { useRegistrationFormContext } from "@/app/context/RegistrationFormContext";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm<TFormValues>({
    mode: "onChange",
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
        <Button label={"Next"} type="submit" />
      </div>
    </form>
  );
}

export default NameForm;
