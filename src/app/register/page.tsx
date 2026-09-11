import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterFlow from "@/components/RegisterFlow";

export const metadata: Metadata = {
  title: "Join Now | P Fitness Hub",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterFlow />
    </Suspense>
  );
}
