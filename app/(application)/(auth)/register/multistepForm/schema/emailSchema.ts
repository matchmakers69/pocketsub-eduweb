import * as yup from "yup";

export const emailSchema = yup.object().shape({
  EmailStep: yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email field cannot be blank"),
  }),
});
