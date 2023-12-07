"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "./hooks/useLogin";
import { loginSchema } from "./schema/loginSchema";
import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/buttons/Button";
import GoogleSignInButton from "@/app/components/buttons/GoogleSignInButton";
import GithubSignInButton from "@/app/components/buttons/GithubSignInButton";
import { collectFormErrors } from "@/app/utils/collectFormErrors";
import FormErrors from "@/app/components/formElements/FormErrors";

type TLoginFormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const { loginUser, loading } = useLogin();

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

  const formErrorsMessage = collectFormErrors(errors);
  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <FormErrors errors={formErrorsMessage as string[]} />
        <div className="mb-5 flex flex-col gap-1">
          <Input<TLoginFormValues>
            name="email"
            id="email"
            label="Email"
            register={register}
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
            required
            type="password"
          />
        </div>
        <div className="mb-4 flex justify-end gap-1">
          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            label={loading ? "Loading" : "Sign in"}
          />
        </div>
        <div className="mb-4">
          <GoogleSignInButton label="Sign in with Google" />
        </div>

        <div>
          <GithubSignInButton label="Continue with Github" />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
