"use client";

import NameForm from "./NameForm";
import EmailForm from "./EmailForm";
import { useRegistrationFormContext } from "@/app/context/RegistrationFormContext";
import { ReactNode } from "react";
import PasswordForm from "./PasswordForm";

type TStepsMapper = {
  [key: string]: ReactNode;
};

const StepsMapper: TStepsMapper = {
  name: <NameForm />,
  email: <EmailForm />,
  password: <PasswordForm />,
};

function FormStepper() {
  const { currentStepId } = useRegistrationFormContext();
  const Form = StepsMapper[currentStepId];
  return <>{Form}</>;
}

export default FormStepper;
