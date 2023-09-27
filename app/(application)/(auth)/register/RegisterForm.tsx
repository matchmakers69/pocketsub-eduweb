"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./schema/registerSchema";
import useRegister from "./hooks/useRegister";
import Input from "@/app/components/Input";
import Button from "@/app/components/buttons/Button";

type TRegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const { registerUser, loading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<TRegistrationFormValues>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TRegistrationFormValues> = async (
    data,
  ) => {
    await registerUser(data.name, data.email, data.password);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex flex-col gap-1">
          <Input<TRegistrationFormValues>
            name="name"
            id="name"
            label="Name"
            register={register}
            errors={errors}
            type="text"
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <Input<TRegistrationFormValues>
            name="email"
            id="email"
            label="Email"
            register={register}
            errors={errors}
            type="email"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-1">
          <Input<TRegistrationFormValues>
            name="password"
            id="password"
            label="Password"
            register={register}
            errors={errors}
            type="password"
            required
          />
        </div>
        <div className="flex justify-end gap-1">
          <Button
            label={loading ? "Loading" : "Sign up"}
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
