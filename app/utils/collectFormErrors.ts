import { DeepMap, FieldError } from "react-hook-form";

export const collectFormErrors = <T extends Record<string, any>>(
  errors: DeepMap<T, FieldError>,
): string[] => {
  const errorsArray: string[] = [];

  Object.keys(errors).forEach((key) => {
    const fieldError = errors[key];

    if (fieldError) {
      errorsArray.push(fieldError.message ?? "");
    }
  });

  return errorsArray;
};
