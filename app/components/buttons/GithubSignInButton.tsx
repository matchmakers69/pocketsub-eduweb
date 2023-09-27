import { signIn } from "next-auth/react";
import Button from "./Button";
import { useSearchParams } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";

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
      icon={AiFillGithub}
      onClick={loginWithGithub}
      type="button"
    />
  );
}

export default GithubSignInButton;
