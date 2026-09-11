"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Plan, formatNaira } from "@/lib/plans";

export default function PricingCard({ plan }: { plan: Plan }) {
  const [selected, setSelected] = useState(
    plan.options[Math.min(1, plan.options.length - 1)].id
  );

  const activeOption = plan.options.find((o) => o.id === selected) ?? plan.options[0];

  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.featured
          ? "border-brand-blue bg-brand-black text-white"
          : "border-black/10 bg-white text-brand-black"
      }`}
    >
      {plan.featured && (
        <span className="mb-4 w-fit rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
      <p className={`mt-1 text-sm ${plan.featured ? "text-white/60" : "text-brand-gray"}`}>
        {plan.tagline}
      </p>

      <div className="mt-6">
        <span className="font-display text-4xl font-bold">
          {formatNaira(activeOption.amountNaira)}
        </span>
        <span className={`text-sm ${plan.featured ? "text-white/50" : "text-brand-gray"}`}>
          {" "}
          / {activeOption.label.toLowerCase()}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {plan.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              option.id === selected
                ? "border-brand-blue bg-brand-blue text-white"
                : plan.featured
                ? "border-white/20 text-white/70 hover:border-white/40"
                : "border-black/15 text-brand-black/70 hover:border-brand-blue"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            <span className={plan.featured ? "text-white/80" : "text-brand-black/80"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={`/register?option=${activeOption.id}`}
        className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
          plan.featured
            ? "bg-brand-red text-white hover:bg-brand-red-light"
            : "bg-brand-black text-white hover:bg-brand-blue"
        }`}
      >
        Choose {plan.name}
      </Link>
    </div>
  );
}
