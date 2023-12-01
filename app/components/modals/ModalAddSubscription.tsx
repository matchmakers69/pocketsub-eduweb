"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../buttons/Button";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import Input from "../formElements/Input";
import SelectField from "../formElements/Select";

const categoryOptions = [
  "Entertainment",
  "Infrastructure tools",
  "Developer tools",
];

type TAddModalSubscription = {
  name: string;
  category: string;
};

const ModalAddSubscription = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TAddModalSubscription>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { field } = useController({
    control,
    name: "category",
    defaultValue: "",
  });

  const handleFormSubmit: SubmitHandler<TAddModalSubscription> = async (
    data,
  ) => {
    console.log(data);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button label="New subscription" iconName="add-line" type="button" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state-open]:animate-overlayShow fixed inset-0 bg-zinc-950 bg-opacity-80" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute right-[10px] top-[10px] flex h-[25px] w-[25px] appearance-none flex-col items-center justify-center rounded-full focus:shadow-[0_0_0_1px] focus:outline-none"
              aria-label="Close"
            >
              <i className="ri-close-fill text-2xl"></i>
            </button>
          </Dialog.Close>
          <Dialog.Title>Add new subscription</Dialog.Title>
          <Dialog.Description>General information</Dialog.Description>
          <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Input<TAddModalSubscription>
                name="name"
                id="name"
                label="Name"
                register={register}
                errors={errors}
                type="text"
                required
                placeholder="Name field is required"
              />
            </div>
            <div>
              <SelectField
                value={field.value ?? ""}
                onChange={field.onChange}
                label="Select category"
                id="category"
                name="category"
                placeholder="Choose category"
                options={categoryOptions}
              />
            </div>
            <div>
              <Button type="submit" label="Add subscription" />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalAddSubscription;
