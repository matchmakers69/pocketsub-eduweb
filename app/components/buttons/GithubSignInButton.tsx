import { signIn } from "next-auth/react";
import Button from "./Button";
import { useSearchParams } from "next/navigation";
type GithubSignInButtonProps = {
  label: string;
};

function GithubSignInButton({ label }: GithubSignInButtonProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const loginWithGithub = () => signIn("github", { callbackUrl });
  return (
    <Button
      outline
      label={label}
      iconName="github-fill"
      onClick={loginWithGithub}
      type="button"
      fullWidth
    />
  );
}

export default GithubSignInButton;
