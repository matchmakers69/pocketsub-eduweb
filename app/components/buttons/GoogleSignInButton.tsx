import { signIn } from "next-auth/react";
import Button from "./Button";
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
      iconName="google-fill"
      onClick={loginWithGoogle}
      type="button"
      fullWidth
    />
  );
}

export default GoogleSignInButton;
