"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Dumbbell, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#plans", label: "Membership" },
  { href: "/guidelines", label: "Guidelines" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-black text-brand-red">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>
          <span>
            P FITNESS <span className="text-brand-blue">HUB</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-brand-blue ${
                pathname === link.href ? "text-brand-blue" : "text-brand-black/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {status === "authenticated" ? (
            <>
              <Link
                href={session?.user?.role === "admin" ? "/admin" : "/dashboard"}
                className="text-sm font-semibold text-brand-black hover:text-brand-blue"
              >
                {session?.user?.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-brand-black/15 px-4 py-2 text-sm font-semibold transition hover:border-brand-red hover:text-brand-red"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-brand-black hover:text-brand-blue"
              >
                {session ? "" : "Log in"}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-red/30 transition hover:bg-brand-red-light"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-brand-black/80"
              >
                {link.label}
              </Link>
            ))}
            {status === "authenticated" ? (
              <>
                <Link
                  href={session?.user?.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold"
                >
                  {session?.user?.role === "admin" ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-left text-sm font-semibold text-brand-red"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-semibold">
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="w-fit rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
