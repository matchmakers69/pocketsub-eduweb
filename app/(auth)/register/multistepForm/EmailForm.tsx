"use client";

import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegistrationFormContext } from "@/app/context/RegistrationFormContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailSchema } from "./schema/emailSchema";
import { collectFormErrors } from "@/app/utils/collectFormErrors";
import FormErrors from "@/app/components/formElements/FormErrors";

type TFormValues = {
  EmailStep: {
    email: string;
  };
};

function EmailForm() {
  const { goNext, goPrev, setFormValues, formDataValues, markStepAsCompleted } =
    useRegistrationFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<TFormValues>({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      EmailStep: {
        email: formDataValues.EmailStep.email,
      },
    },
  });

  const handleSaveEmail: SubmitHandler<TFormValues> = (data) => {
    setFormValues(data);
    markStepAsCompleted("email");
    goNext();
  };
  const formErrorsMessage = collectFormErrors(errors);
  return (
    <form noValidate onSubmit={handleSubmit(handleSaveEmail)}>
      <FormErrors errors={formErrorsMessage as string[]} />
      <div className="mb-5 flex flex-col gap-1">
        <Input<TFormValues>
          name="EmailStep.email"
          id="email"
          label="Email"
          register={register}
          type="email"
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={goPrev} label={"Back"} type="button" />
        <Button
          label={"Next"}
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        />
      </div>
    </form>
  );
}

export default EmailForm;
