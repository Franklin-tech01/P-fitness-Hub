"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { SESSION_TIMETABLE } from "@/lib/plans";

export default function Timetable() {
  const [tab, setTab] = useState<"morning" | "evening">("morning");
  const classes = SESSION_TIMETABLE[tab];

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex justify-center gap-2">
        <button
          onClick={() => setTab("morning")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
            tab === "morning" ? "bg-brand-blue text-white" : "bg-brand-gray-light text-brand-black/70"
          }`}
        >
          <Sun size={16} /> Morning
        </button>
        <button
          onClick={() => setTab("evening")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
            tab === "evening" ? "bg-brand-blue text-white" : "bg-brand-gray-light text-brand-black/70"
          }`}
        >
          <Moon size={16} /> Evening
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/10">
        {classes.map((session, idx) => (
          <div
            key={session.name}
            className={`flex items-center justify-between px-6 py-4 ${
              idx % 2 === 0 ? "bg-white" : "bg-brand-gray-light"
            }`}
          >
            <span className="font-semibold text-brand-black">{session.name}</span>
            <span className="text-brand-blue font-medium">{session.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
