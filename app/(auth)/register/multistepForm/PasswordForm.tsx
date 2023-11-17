"use client";

import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/buttons/Button";
import { useRegistrationFormContext } from "@/app/context/RegistrationFormContext";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";

type TFormValues = {
  PasswordStep: {
    password: string;
  };
};

function PasswordForm() {
  const { loading } = useRegister();
  const { goPrev, setFormValues, formDataValues, markStepAsCompleted } =
    useRegistrationFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<TFormValues>({
    mode: "onChange",
    defaultValues: {
      PasswordStep: {
        password: formDataValues.PasswordStep.password,
      },
    },
  });

  const handleSavePassword: SubmitHandler<TFormValues> = (data) => {
    setFormValues(data);
    markStepAsCompleted("password");
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSavePassword)}>
      <div className="mb-5 flex flex-col gap-1">
        <Input<TFormValues>
          name="PasswordStep.password"
          id="password"
          label="Password"
          register={register}
          errors={errors as Partial<{ PasswordStep: { password: FieldError } }>}
          type="password"
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={goPrev} label={"Back"} type="button" />
        <Button
          label={loading ? "Loading" : "Register"}
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        />
      </div>
    </form>
  );
}

export default PasswordForm;
