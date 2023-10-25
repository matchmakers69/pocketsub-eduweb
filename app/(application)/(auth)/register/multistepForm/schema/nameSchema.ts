import * as yup from "yup";

export const nameSchema = yup.object().shape({
  UsernameStep: yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must have a minimum of 2 characters")
      .max(40, "Name cannot have more than 40 characters")
      .required("Name is a required field"),
  }),
});
