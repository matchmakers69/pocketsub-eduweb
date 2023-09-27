import { signIn } from "next-auth/react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

type GoogleSignInButtonProps = {
  label: string;
};

function GoogleSignInButton({ label }: GoogleSignInButtonProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const loginWithGoogle = () => signIn("google", { callbackUrl });
  return (
    <Button
      outline
      label={label}
      icon={FcGoogle}
      onClick={loginWithGoogle}
      type="button"
    />
  );
}

export default GoogleSignInButton;
