import { redirect } from "next/navigation";
import { Users, Wallet, ShieldCheck, Clock3 } from "lucide-react";
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

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  const [users, memberships] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.membership.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const now = new Date();
  const activeMemberships = memberships.filter(
    (m) => m.status === "active" && m.expiryDate && m.expiryDate > now
  );
  const activeMemberUserIds = new Set(activeMemberships.map((m) => m.userId));
  const totalRevenue = memberships
    .filter((m) => m.status === "active")
    .reduce((sum, m) => sum + m.amountNaira, 0);
  const pendingCount = memberships.filter((m) => m.status === "pending").length;

  const stats = [
    { icon: Users, label: "Total Users", value: users.length.toLocaleString() },
    { icon: ShieldCheck, label: "Active Members", value: activeMemberUserIds.size.toLocaleString() },
    { icon: Wallet, label: "Total Revenue", value: formatNaira(totalRevenue) },
    { icon: Clock3, label: "Pending Payments", value: pendingCount.toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div>
        <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Admin</span>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Welcome, {session.user.name?.split(" ")[0] ?? "Admin"}
        </h1>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-black/10 bg-white p-6">
            <s.icon className="text-brand-blue" size={22} />
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-brand-gray">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold">Users</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-brand-gray">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-black/5">
                  <td className="py-3 pr-4 font-medium">{u.name}</td>
                  <td className="py-3 pr-4 text-brand-gray">{u.email}</td>
                  <td className="py-3 pr-4 text-brand-gray">{u.phone ?? "—"}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        u.role === "admin" ? "bg-brand-blue/10 text-brand-blue" : "bg-black/5 text-brand-gray"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-brand-gray">{u.createdAt.toLocaleDateString("en-NG")}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-brand-gray">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold">Payments</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-brand-gray">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Plan</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Reference</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m) => (
                <tr key={m.id} className="border-b border-black/5">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{m.user.name}</div>
                    <div className="text-xs text-brand-gray">{m.user.email}</div>
                  </td>
                  <td className="py-3 pr-4">
                    {m.planName} · {m.optionLabel}
                  </td>
                  <td className="py-3 pr-4 font-medium">{formatNaira(m.amountNaira)}</td>
                  <td className="py-3 pr-4 truncate text-xs text-brand-gray">{m.paymentRef}</td>
                  <td className="py-3 pr-4 text-brand-gray">{m.createdAt.toLocaleDateString("en-NG")}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusBadge(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
              {memberships.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-brand-gray">
                    No payments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
