import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const reference = body?.reference as string | undefined;
  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const membership = await prisma.membership.findUnique({ where: { paymentRef: reference } });
  if (!membership || membership.userId !== session.user.id) {
    return NextResponse.json({ error: "Membership not found" }, { status: 404 });
  }

  if (membership.status === "active") {
    return NextResponse.json({ status: "active", membership });
  }

  const verification = await verifyPaystackTransaction(reference);
  const paystackData = verification.data;

  const expectedAmountKobo = membership.amountNaira * 100;

  if (
    paystackData.status === "success" &&
    paystackData.amount === expectedAmountKobo
  ) {
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + membership.durationDays);

    const updated = await prisma.membership.update({
      where: { id: membership.id },
      data: { status: "active", startDate, expiryDate },
    });

    return NextResponse.json({ status: "active", membership: updated });
  }

  const updated = await prisma.membership.update({
    where: { id: membership.id },
    data: { status: "failed" },
  });

  return NextResponse.json(
    { status: "failed", membership: updated, error: "Payment could not be verified" },
    { status: 402 }
  );
}
