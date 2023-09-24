import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Email field cannot be blank"),
  password: yup.string().required("Password field cannot be blank"),
});
