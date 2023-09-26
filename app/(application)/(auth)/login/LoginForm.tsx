"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "./hooks/useLogin";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { loginSchema } from "./schema/loginSchema";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

type TLoginFormValues = {
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
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<TLoginFormValues>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TLoginFormValues> = async (data) => {
    await loginUser(data.email, data.password);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex flex-col gap-1">
          <Input<TLoginFormValues>
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
          <Input<TLoginFormValues>
            name="password"
            id="password"
            label="Password"
            register={register}
            errors={errors}
            required
            type="password"
          />
        </div>
        <div className="mb-4 flex justify-end gap-1">
          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            label={loading ? "Loading" : "SignIn"}
          />
        </div>
        <div className="mb-4">
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google", { callbackUrl })}
            type="button"
          />
        </div>

        <div>
          <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn("github", { callbackUrl })}
            type="button"
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
