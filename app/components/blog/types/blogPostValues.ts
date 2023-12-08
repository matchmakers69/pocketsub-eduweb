import * as Yup from "yup";
import { blogValidationSchema } from "../validationSchema";
export type TBlogPostValue = Yup.InferType<typeof blogValidationSchema>;
