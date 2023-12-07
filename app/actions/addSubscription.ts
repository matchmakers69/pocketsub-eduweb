import { prisma } from "@/lib/db";
import {
  PAYMENT_STATUS,
  SUBSCRIPTION_BILLING_PERIOD,
  SUBSCRIPTION_CURRENCY,
} from "@prisma/client";

interface AddSubscriptionProps {
  name: string;
  category: string;
  avatar_url: string;
  next_payment: string | Date;
  price: number;
  billing_period: string;
  currency: SUBSCRIPTION_CURRENCY;
  userId: string;
}

export async function addSubscription(props: AddSubscriptionProps) {
  const {
    name,
    category,
    avatar_url,
    next_payment,
    price,
    billing_period,
    currency,
    userId,
  } = props;
  await prisma.subscription.create({
    data: {
      name,
      category,
      avatar_url,
      next_payment_date: new Date(next_payment),
      price,
      start_date: new Date(), // dzien dzisiejszy,
      billing_period: billing_period as SUBSCRIPTION_BILLING_PERIOD,
      currency,
      ownerId: userId!,
      payments: {
        create: {
          amount: price,
          due_date: new Date(next_payment),
          status: PAYMENT_STATUS.NOT_PAID,
        },
      },
    },
  });
}
