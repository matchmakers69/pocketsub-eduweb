import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  PasswordStep: yup.object().shape({
    password: yup
      .string()
      .min(10, "Password must have min 10 characters")
      .max(30, "Password cannot have more then 30 characters")
      .required("Password cannot be blank"),
  }),
});
