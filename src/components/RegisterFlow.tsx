"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Check, Loader2 } from "lucide-react";
import { PLANS, findBillingOption, formatNaira } from "@/lib/plans";
import PaystackCheckout from "@/components/PaystackCheckout";
import PasswordInput from "@/components/PasswordInput";

type Step = "plan" | "account" | "pay";

export default function RegisterFlow() {
  const searchParams = useSearchParams();
  const initialOption = searchParams.get("option") ?? PLANS[1].options[0].id;

  const [optionId, setOptionId] = useState(initialOption);
  const [step, setStep] = useState<Step>("account");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const found = findBillingOption(optionId) ?? findBillingOption(PLANS[1].options[0].id)!;

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");

      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (signInRes?.error) throw new Error("Account created, but sign-in failed. Try logging in.");

      setStep("pay");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Join The Hub</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Create your membership</h1>
      </div>

      <div className="mb-10 flex items-center justify-center gap-4 text-sm font-semibold">
        <StepBadge active={step === "plan" || step === "account" || step === "pay"} label="1. Plan" />
        <span className="h-px w-8 bg-black/10" />
        <StepBadge active={step === "account" || step === "pay"} label="2. Account" />
        <span className="h-px w-8 bg-black/10" />
        <StepBadge active={step === "pay"} label="3. Payment" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-lg font-bold">Choose a plan &amp; billing option</h2>
          <div className="mt-4 space-y-4">
            {PLANS.map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-black/10 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold">{plan.name}</h3>
                  <span className="text-xs text-brand-gray">{plan.tagline}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {plan.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      disabled={step === "pay"}
                      onClick={() => setOptionId(option.id)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        option.id === optionId
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-black/15 hover:border-brand-blue"
                      }`}
                    >
                      {option.label} · {formatNaira(option.amountNaira)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {step === "account" && (
            <form
              onSubmit={handleCreateAccount}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <h2 className="font-display text-lg font-bold">Your details</h2>
              <div className="mt-4 space-y-4">
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input"
                    placeholder="jane@example.com"
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                    placeholder="080..."
                  />
                </Field>
                <Field label="Password">
                  <PasswordInput
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input"
                    placeholder="At least 8 characters"
                  />
                </Field>
              </div>

              {error && <p className="mt-4 text-sm text-brand-red">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-blue disabled:opacity-60"
              >
                {loading && <Loader2 className="animate-spin" size={16} />}
                Continue to payment
              </button>

              <p className="mt-4 text-center text-xs text-brand-gray">
                Already a member?{" "}
                <Link href="/login" className="font-semibold text-brand-blue">
                  Log in
                </Link>
              </p>
            </form>
          )}

          {step === "pay" && (
            <PaystackCheckout
              optionId={found.option.id}
              planName={found.plan.name}
              optionLabel={found.option.label}
              amountNaira={found.option.amountNaira}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StepBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${
        active ? "bg-brand-blue text-white" : "bg-brand-gray-light text-brand-gray"
      }`}
    >
      {active && <Check size={14} />}
      {label}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-gray">
        {label}
      </span>
      {children}
    </label>
  );
}
