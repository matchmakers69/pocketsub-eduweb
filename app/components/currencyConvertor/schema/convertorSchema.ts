import * as yup from "yup";

export const convertorSchema = yup.object().shape({
  amount: yup
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
    .min(0, "Please enter a valid number")
    .moreThan(-0.0001, "Please enter a valid number")
    .max(9999999999, "Number must be less than or equal to 10 digits")
    .test({
      message: "Please enter a valid number",
      test: (value) => (Object.is(value, -0) ? false : true),
    })
    .required("This field is required"),
  currencyOption: yup.string().oneOf(["PLN", "USD", "EUR", "GBP"]),
});
