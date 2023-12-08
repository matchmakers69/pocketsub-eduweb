import { prisma } from "@/lib/db";
import { SUBSCRIPTION_BILLING_PERIOD, PAYMENT_STATUS } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    category,
    avatar_url,
    next_payment,
    price,
    billing_period,
    currency,
    userId,
  } = await req.json();

  await prisma.subscription.create({
    data: {
      name,
      category,
      avatar_url,
      next_payment_date: new Date(next_payment),
      price,
      start_date: new Date(),
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
  return NextResponse.json({ message: "Subscription added" }, { status: 200 });
}
