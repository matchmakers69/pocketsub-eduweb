import * as yup from "yup";
import { SUBSCRIPTION_BILLING_PERIOD } from "@prisma/client";

export const subscriptionValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  cost: yup
    .number()
    .positive("Please enter a positive number")
    .typeError("Please enter a valid number")
    .transform((originalValue) => {
      // Handle the case when the input is a string with a dot (e.g., "0.00")
      if (typeof originalValue === "string" && originalValue.includes(".")) {
        return parseFloat(originalValue);
      }
      return originalValue;
    })
    .min(1, "Please enter a valid cost")
    .moreThan(-0.01, "Please enter a valid number")
    .max(9999999999, "Number must be less than or equal to 10 digits")
    .test({
      message: "Cost is not valid",
      test: (value) => {
        const stringValue = String(value);
        return /^(-?)(?!0\d*$)\d*\.?\d+$/.test(stringValue);
      },
    }),
  currency: yup.string().required("Currency is required"),
  avatar_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!",
    ),
  billing_period: yup
    .string()
    .oneOf(Object.values(SUBSCRIPTION_BILLING_PERIOD))
    .required("Select"),
  next_payment: yup.date(),
});
