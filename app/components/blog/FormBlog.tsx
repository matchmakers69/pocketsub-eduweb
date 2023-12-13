"use client";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { blogValidationSchema } from "./validationSchema";
import { collectFormErrors } from "@/app/utils/collectFormErrors";
import FormErrors from "../formElements/FormErrors";
import Input from "../formElements/Input";
import Button from "../buttons/Button";
import TextArea from "../formElements/TextArea";
import SelectField, { Option } from "../formElements/Select";

const tagOptions: Array<string> = ["javascript", "php", "java"];

export type TAddBlogPostValue = Yup.InferType<typeof blogValidationSchema>;

type FormBlogProps = {
  //submit: (data: TAddBlogPostValue) => void;
  submit: SubmitHandler<TAddBlogPostValue>;
  isEditing?: boolean;
};

function FormBlog({ submit, isEditing = false }: FormBlogProps) {
  const {
    register,
    control,
    formState: { errors, isDirty, isValid },
    // reset,
    handleSubmit,
  } = useForm<TAddBlogPostValue>({
    mode: "onChange",
    resolver: yupResolver(blogValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      tag: "javascript",
    },
  });

  const { field: tagField } = useController({
    name: "tag",
    control,
  });

  const formErrorsMessage = collectFormErrors(errors);
  return (
    <>
      <FormErrors errors={formErrorsMessage as string[]} />
      <form noValidate onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <Input<TAddBlogPostValue>
            name="title"
            id="title"
            label="Article title"
            register={register}
            type="text"
            required
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <TextArea
            name="description"
            register={register}
            required
            placeholder="Article content"
            rows={4}
            cols={50}
          />
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <SelectField
            fullWidth
            value={tagField.value ?? ""}
            onChange={(option: Option) => tagField.onChange(option)}
            label="Choose programming language"
            id="tag"
            name="tag"
            placeholder="Select tags"
            options={tagOptions}
          />
        </div>
        <div className="mb-4">
          <Button
            disabled={!isDirty || !isValid}
            fullWidth
            type="submit"
            label={isEditing ? "Update article" : "Create article"}
          />
        </div>
      </form>
    </>
  );
}

export default FormBlog;
