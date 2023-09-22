"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useLogin from "./hooks/useLogin";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type TFormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const { loginUser, loading } = useLogin();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm<TFormValues>();

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    await loginUser(data.email, data.password);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="h-11 rounded-md border px-4"
            {...register("email", { required: true })}
          />
        </div>

        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="h-11 rounded-md border px-4"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex justify-end gap-1">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="h-11 rounded-md bg-black px-6 text-white"
            type="submit"
          >
            {loading ? "Loading" : "SignIn"}
          </button>
        </div>
        <div className="mb-3">
          <a
            role="button"
            className=""
            onClick={() => signIn("google", { callbackUrl })}
          >
            Login with Google
          </a>
        </div>

        <div className="mb-3">
          <a
            role="button"
            className=""
            onClick={() => signIn("github", { callbackUrl })}
          >
            Login with Github
          </a>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
