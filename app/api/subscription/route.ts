import { prisma } from "@/lib/db";
import { SUBSCRIPTION_BILLING_PERIOD, PAYMENT_STATUS } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    category,
    avatar_url,
    next_payment_date,
    price,
    billing_period,
    currency,
    ownerId,
  } = await req.json();

  await prisma.subscription.create({
    data: {
      name,
      category,
      avatar_url,
      next_payment_date: new Date(next_payment_date),
      price,
      start_date: new Date(),
      billing_period: billing_period as SUBSCRIPTION_BILLING_PERIOD,
      currency,
      ownerId: ownerId!,
      payments: {
        create: {
          amount: price,
          due_date: new Date(next_payment_date),
          status: PAYMENT_STATUS.NOT_PAID,
        },
      },
    },
  });
  return NextResponse.json({ message: "Subscription added" }, { status: 200 });
}
