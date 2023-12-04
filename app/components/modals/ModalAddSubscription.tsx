"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../buttons/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import Input from "../formElements/Input";
import SelectField from "../formElements/Select";
import {
  SUBSCRIPTION_CURRENCY,
  SUBSCRIPTION_BILLING_PERIOD,
} from "@prisma/client";
import { subscriptionValidationSchema } from "./validationSchema";

const categoryOptions = [
  "Entertainment",
  "Infrastructure tools",
  "Developer tools",
];

const currencies: SUBSCRIPTION_CURRENCY[] = ["EUR", "GBP", "PLN", "USD"];
const billingPeriod: SUBSCRIPTION_BILLING_PERIOD[] = ["MONTHLY", "YEARLY"];

export type TAddModalSubscription = Yup.InferType<
  typeof subscriptionValidationSchema
>;

const ModalAddSubscription = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<TAddModalSubscription>({
    mode: "onChange",
    resolver: yupResolver(subscriptionValidationSchema),
    defaultValues: {
      name: "",
      category: "",
      cost: undefined,
      currency: "",
    },
  });

  const categoryController = useController({
    control,
    name: "category",
    defaultValue: "",
  });

  const billingPeriodController = useController({
    control,
    name: "billing_period",
    defaultValue: "",
  });

  const currencyController = useController({
    control,
    name: "currency",
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
        <Dialog.Overlay className="fixed inset-0 bg-zinc-950 bg-opacity-80 data-[state-open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] min-h-[70vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute right-[10px] top-[10px] flex h-[25px] w-[25px] appearance-none flex-col items-center justify-center rounded-full focus:shadow-[0_0_0_1px] focus:outline-none"
              aria-label="Close"
            >
              <i className="ri-close-fill text-2xl"></i>
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-2xl font-medium">
            Add new subscription
          </Dialog.Title>
          <Dialog.Description className="mb-4 mt-5 font-medium">
            General information
          </Dialog.Description>
          <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex w-full flex-col justify-center">
                <Input<TAddModalSubscription>
                  name="name"
                  id="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  type="text"
                  required
                  placeholder="Subscription name"
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                <SelectField
                  value={categoryController.field.value ?? ""}
                  onChange={categoryController.field.onChange}
                  label="Category"
                  id="category"
                  name="category"
                  placeholder="Choose category"
                  options={categoryOptions}
                  fullWidth
                />
              </div>
            </div>

            <div className="relative">
              <Input<TAddModalSubscription>
                name="avatar_url"
                id="avatar_url"
                label="Website"
                register={register}
                errors={errors}
                type="text"
                required
                placeholder="google.com"
                mask
                maskText={"https://"}
              />
            </div>
            <p className="pt-1 text-[10px] font-light text-zinc-700">
              Giving information about webpage you will help us generate proper
              avatar for most service
            </p>
            <Dialog.Description className="mb-4 mt-5 font-medium">
              Expense information
            </Dialog.Description>
            <div className="relative">
              <Input<TAddModalSubscription>
                name="cost"
                id="cost"
                register={register}
                errors={errors}
                type="number"
                step="0.01"
                min="0"
                label="Cost"
                placeholder="0.00"
              />
              <SelectField
                value={currencyController.field.value ?? ""}
                onChange={currencyController.field.onChange}
                id="currency"
                name="currency"
                options={currencies}
                maskRight
                hideDropDown
                placeholder="Currency"
              />
            </div>
            <Dialog.Description className="mb-4 mt-5 font-medium">
              Billing information
            </Dialog.Description>
            <div className="flex items-center gap-4">
              <div className="flex w-full flex-col justify-center">
                <SelectField
                  value={billingPeriodController.field.value ?? ""}
                  onChange={billingPeriodController.field.onChange}
                  id="billing_period"
                  name="billing_period"
                  label="Billing period"
                  options={billingPeriod}
                  fullWidth
                  placeholder="Select billing period"
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                <Input<TAddModalSubscription>
                  name="next_payment"
                  id="next_payment"
                  label="Next payment"
                  register={register}
                  errors={errors}
                  type="date"
                  required
                  placeholder="Next billing date"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4">
              <Dialog.Close asChild>
                <Button outline type="button" fullWidth label="Cancel" />
              </Dialog.Close>
              <Button
                disabled={!isDirty || !isValid}
                fullWidth
                type="submit"
                label="Add new subscription"
              />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalAddSubscription;
