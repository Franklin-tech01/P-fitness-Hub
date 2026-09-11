"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { formatNaira } from "@/lib/plans";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

export default function PaystackCheckout({
  optionId,
  planName,
  optionLabel,
  amountNaira,
}: {
  optionId: string;
  planName: string;
  optionLabel: string;
  amountNaira: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      const initRes = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      const initData = await initRes.json();
      if (!initRes.ok) throw new Error(initData.error ?? "Could not start payment");

      if (!window.PaystackPop) throw new Error("Payment library did not load. Refresh and try again.");
      if (!initData.publicKey) throw new Error("Payment is not configured yet. Add your Paystack keys.");

      const handler = window.PaystackPop.setup({
        key: initData.publicKey,
        email: initData.email,
        amount: initData.amountKobo,
        currency: "NGN",
        ref: initData.reference,
        metadata: { planName, optionLabel },
        callback: (response: { reference: string }) => {
          fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference }),
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.status === "active") {
                router.push("/dashboard?payment=success");
              } else {
                setError("Payment could not be confirmed. Please contact support.");
              }
            })
            .finally(() => setLoading(false));
        },
        onClose: () => setLoading(false),
      });
      handler.openIframe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <Script
        src="https://js.paystack.co/v2/inline.js"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />

      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray">Selected plan</p>
          <p className="font-display text-lg font-bold">
            {planName} — {optionLabel}
          </p>
        </div>
        <p className="font-display text-2xl font-bold text-brand-blue">{formatNaira(amountNaira)}</p>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-brand-red">{error}</p>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !scriptReady}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-red-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
        {loading ? "Processing..." : `Pay ${formatNaira(amountNaira)} with Paystack`}
      </button>

      <p className="mt-3 text-center text-xs text-brand-gray">
        Payments are securely processed by Paystack. Card, bank transfer and USSD supported.
      </p>
    </div>
  );
}
