import Link from "next/link";
import { Dumbbell, MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, XIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-red">
                <Dumbbell size={18} strokeWidth={2.5} />
              </span>
              P FITNESS <span className="text-brand-blue-light">HUB</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Train. Sweat. Grow. A modern gym built for real results, flexible
              plans and a community that pushes you further.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-brand-blue">
                <InstagramIcon size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-brand-blue">
                <FacebookIcon size={16} />
              </a>
              <a href="#" aria-label="X (Twitter)" className="rounded-full bg-white/10 p-2 hover:bg-brand-blue">
                <XIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/#plans" className="hover:text-white">Membership Plans</Link></li>
              <li><Link href="/guidelines" className="hover:text-white">Rules &amp; Guidelines</Link></li>
              <li><Link href="/register" className="hover:text-white">Join Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Session Times
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>Morning: 7:00 AM – 9:30 AM</li>
              <li>Evening: 4:00 PM – 7:15 PM</li>
              <li>Open 7 days a week</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2"><MapPin size={16} className="shrink-0 text-brand-red" /> 12 Fitness Lane, Lagos, Nigeria</li>
              <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-brand-red" /> +234 800 000 0000</li>
              <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-brand-red" /> hello@pfitnesshub.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} P Fitness Hub Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
