import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must have min 2 characters")
    .max(40, "Password cannot have more then 40 characters")
    .required("Name is a required field"),
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Email field cannot be blank"),
  password: yup
    .string()
    .min(10, "Password must have min 10 characters")
    .max(30, "Password cannot have more then 30 characters")
    .required("Password cannot be blank"),
});
