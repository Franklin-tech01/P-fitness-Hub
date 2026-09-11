"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid email or password");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Welcome Back</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Log in to your account</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-black/10 bg-white p-6">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-gray">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="jane@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-gray">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="text-sm text-brand-red">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-blue disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Log In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-gray">
        Not a member yet?{" "}
        <Link href="/register" className="font-semibold text-brand-blue">
          Join now
        </Link>
      </p>
    </div>
  );
}
