import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { findBillingOption } from "@/lib/plans";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const optionId = body?.optionId as string | undefined;
  if (!optionId) {
    return NextResponse.json({ error: "Missing optionId" }, { status: 400 });
  }

  const found = findBillingOption(optionId);
  if (!found) {
    return NextResponse.json({ error: "Unknown plan option" }, { status: 400 });
  }
  const { plan, option } = found;

  const reference = `PFH-${randomUUID()}`;

  const membership = await prisma.membership.create({
    data: {
      userId: session.user.id,
      planId: plan.id,
      planName: plan.name,
      optionId: option.id,
      optionLabel: option.label,
      amountNaira: option.amountNaira,
      durationDays: option.durationDays,
      status: "pending",
      paymentRef: reference,
    },
  });

  return NextResponse.json({
    reference: membership.paymentRef,
    amountKobo: option.amountNaira * 100,
    email: session.user.email,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    planName: plan.name,
    optionLabel: option.label,
  });
}
