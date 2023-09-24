"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./schema/registerSchema";
import useRegister from "./hooks/useRegister";

type TFormValues = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const { registerUser, loading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm<TFormValues>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    await registerUser(data.name, data.email, data.password);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="h-11 rounded-md border px-4"
            {...register("name")}
          />
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="h-11 rounded-md border px-4"
            {...register("email")}
          />
        </div>

        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="h-11 rounded-md border px-4"
            {...register("password")}
          />
        </div>
        <div className="flex justify-end gap-1">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="h-11 rounded-md bg-black px-6 text-white"
            type="submit"
          >
            {loading ? "Loading" : "SignUp"}
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
