export type BillingOption = {
  id: string;
  label: string;
  amountNaira: number;
  durationDays: number;
};

export type Plan = {
  id: "basic" | "classic" | "bulk";
  name: string;
  tagline: string;
  featured?: boolean;
  features: string[];
  options: BillingOption[];
};

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Everything you need to get moving.",
    features: [
      "Access to all gym classes within hours of operation",
      "Access to available gym equipment and facilities",
    ],
    options: [
      { id: "basic-daily", label: "Daily", amountNaira: 2000, durationDays: 1 },
      { id: "basic-weekly", label: "Weekly", amountNaira: 10000, durationDays: 7 },
      { id: "basic-monthly", label: "Monthly", amountNaira: 20000, durationDays: 30 },
    ],
  },
  {
    id: "classic",
    name: "Classic",
    tagline: "For members who want expert guidance.",
    featured: true,
    features: [
      "Access to all gym classes",
      "Access to available gym equipment and facilities",
      "Weekly access to an instructor for specialized classes",
    ],
    options: [
      { id: "classic-daily", label: "Daily", amountNaira: 3500, durationDays: 1 },
      { id: "classic-monthly", label: "Monthly", amountNaira: 35000, durationDays: 30 },
    ],
  },
  {
    id: "bulk",
    name: "Bulk",
    tagline: "Commit long-term and save the most.",
    features: [
      "Access to all gym classes",
      "Access to available gym facilities during operating hours",
      "Long-term membership benefits",
    ],
    options: [
      { id: "bulk-3m", label: "3 Months", amountNaira: 55000, durationDays: 90 },
      { id: "bulk-6m", label: "6 Months", amountNaira: 100000, durationDays: 180 },
      { id: "bulk-1y", label: "1 Year", amountNaira: 200000, durationDays: 365 },
    ],
  },
];

export function findBillingOption(optionId: string) {
  for (const plan of PLANS) {
    const option = plan.options.find((o) => o.id === optionId);
    if (option) return { plan, option };
  }
  return null;
}

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export const SESSION_TIMETABLE = {
  morning: [
    { name: "1st Class", time: "7:00 AM – 8:00 AM" },
    { name: "2nd Class", time: "8:30 AM – 9:30 AM" },
  ],
  evening: [
    { name: "1st Class", time: "4:00 PM – 5:00 PM" },
    { name: "2nd Class", time: "5:10 PM – 6:10 PM" },
    { name: "3rd Class", time: "6:15 PM – 7:15 PM" },
  ],
};
