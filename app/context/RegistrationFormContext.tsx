"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseProps } from "../types/BaseProps";
import useRegister from "../(auth)/register/hooks/useRegister";

type TFormDataValues = {
  UsernameStep: {
    name: string;
  };
  EmailStep: {
    email: string;
  };
  PasswordStep: {
    password: string;
  };
};

type TMultiStepRegistration = {
  goNext: () => void;
  goPrev: () => void;
  currentStepId: string;
  formDataValues: TFormDataValues;
  setFormValues: (formValues: Partial<TFormDataValues>) => void;
  markStepAsCompleted: (stepId: string) => void;
};

const FormValues = {
  UsernameStep: {
    name: "",
  },
  EmailStep: {
    email: "",
  },
  PasswordStep: {
    password: "",
  },
};

const RegistrationFormContext = createContext<TMultiStepRegistration>({
  goNext: () => undefined,
  goPrev: () => undefined,
  currentStepId: "name",
  formDataValues: FormValues,
  setFormValues: () => undefined,
  markStepAsCompleted: () => undefined,
});

const stepOrder = ["name", "email", "password"];

export default function RegistrationFormProvider({ children }: BaseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [formDataValues, setFormDataValues] =
    useState<TFormDataValues>(FormValues);
  const { registerUser } = useRegister();

  const currentStepId = stepOrder[currentStepIndex];

  const handleGoToNextStep = useCallback(() => {
    if (currentStepIndex < stepOrder.length - 1) {
      setCurrentStepIndex((preState) => preState + 1);
    }
  }, [currentStepIndex]);

  const handleGoToPrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevState) => prevState - 1);
    }
  }, [currentStepIndex]);

  const setFormValues = (values: Partial<TFormDataValues>) => {
    setFormDataValues((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const markStepAsCompleted = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prevSteps) => [...prevSteps, stepId]);
    }
  };

  const handleAPICall = useCallback(async () => {
    try {
      const { UsernameStep, EmailStep, PasswordStep } = formDataValues;
      await registerUser(
        UsernameStep.name,
        EmailStep.email,
        PasswordStep.password,
      );
    } catch (error) {
      console.error("API call error:", error);
    }
  }, [formDataValues, registerUser]);

  useEffect(() => {
    if (completedSteps.length === stepOrder.length) {
      handleAPICall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedSteps]);

  return (
    <RegistrationFormContext.Provider
      value={{
        goNext: handleGoToNextStep,
        goPrev: handleGoToPrevStep,
        currentStepId,
        formDataValues,
        setFormValues,
        markStepAsCompleted,
      }}
    >
      {children}
    </RegistrationFormContext.Provider>
  );
}
export const useRegistrationFormContext = () =>
  useContext(RegistrationFormContext);
