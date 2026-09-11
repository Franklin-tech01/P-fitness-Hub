import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, CreditCard, Sparkles, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatNaira } from "@/lib/plans";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-brand-red",
    expired: "bg-black/10 text-brand-gray",
  };
  return map[status] ?? "bg-black/10 text-brand-gray";
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const memberships = await prisma.membership.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();
  const activeMembership = memberships.find(
    (m) => m.status === "active" && m.expiryDate && m.expiryDate > now
  );

  let daysLeft = 0;
  let percentLeft = 0;
  if (activeMembership?.startDate && activeMembership?.expiryDate) {
    const total = activeMembership.expiryDate.getTime() - activeMembership.startDate.getTime();
    const remaining = activeMembership.expiryDate.getTime() - now.getTime();
    daysLeft = Math.max(0, Math.ceil(remaining / (1000 * 60 * 60 * 24)));
    percentLeft = Math.max(0, Math.min(100, Math.round((remaining / total) * 100)));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Dashboard</span>
          <h1 className="mt-1 font-display text-3xl font-bold">
            Welcome back, {session.user.name?.split(" ")[0] ?? "Member"}
          </h1>
        </div>
        <Link
          href="/register"
          className="flex items-center gap-2 rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue"
        >
          Get a new plan <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Current plan */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-blue" size={20} />
            <h2 className="font-display text-lg font-bold">Current Membership</h2>
          </div>

          {activeMembership ? (
            <div className="mt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl font-bold">
                  {activeMembership.planName} · {activeMembership.optionLabel}
                </p>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">
                  Active
                </span>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-brand-blue transition-all"
                  style={{ width: `${percentLeft}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-brand-gray">
                {daysLeft} day{daysLeft === 1 ? "" : "s"} remaining · Expires{" "}
                {activeMembership.expiryDate?.toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-brand-gray">Amount Paid</p>
                  <p className="font-semibold">{formatNaira(activeMembership.amountNaira)}</p>
                </div>
                <div>
                  <p className="text-brand-gray">Started</p>
                  <p className="font-semibold">
                    {activeMembership.startDate?.toLocaleDateString("en-NG")}
                  </p>
                </div>
                <div>
                  <p className="text-brand-gray">Reference</p>
                  <p className="truncate font-semibold">{activeMembership.paymentRef}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-brand-gray-light p-8 text-center">
              <p className="font-semibold">You don&apos;t have an active plan yet.</p>
              <p className="mt-1 text-sm text-brand-gray">
                Choose a membership package to unlock full gym access.
              </p>
              <Link
                href="/#plans"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white hover:bg-brand-red-light"
              >
                View Plans <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Quick info */}
        <div className="rounded-2xl border border-black/10 bg-brand-black p-6 text-white">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-brand-blue-light" size={20} />
            <h2 className="font-display text-lg font-bold">Session Times</h2>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Morning: 7:00 AM – 9:30 AM</li>
            <li>Evening: 4:00 PM – 7:15 PM</li>
          </ul>
          <Link
            href="/guidelines"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-light hover:text-white"
          >
            View gym guidelines <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Payment history */}
      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center gap-2">
          <CreditCard className="text-brand-blue" size={20} />
          <h2 className="font-display text-lg font-bold">Payment History</h2>
        </div>

        {memberships.length === 0 ? (
          <p className="mt-4 text-sm text-brand-gray">No payments yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-brand-gray">
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr key={m.id} className="border-b border-black/5">
                    <td className="py-3 pr-4 font-medium">
                      {m.planName} · {m.optionLabel}
                    </td>
                    <td className="py-3 pr-4">{formatNaira(m.amountNaira)}</td>
                    <td className="py-3 pr-4 text-brand-gray">
                      {m.createdAt.toLocaleDateString("en-NG")}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusBadge(m.status)}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
