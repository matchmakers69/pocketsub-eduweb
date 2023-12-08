import * as yup from "yup";

export const blogValidationSchema = yup.object().shape({
  title: yup
    .string()
    .max(20, "Maximum 20 characters")
    .min(2, "Minimum 2 characters")
    .required("Title is required"),
  description: yup
    .string()
    .max(500, "Maximum 500 characters")
    .min(10, "Minimum 10 characters")
    .required("Description is required"),
  tag: yup.string().required("Select"),
});
