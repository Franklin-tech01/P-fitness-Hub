import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, XIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center">
              <Image src="/images/logo-dark-bg.png" alt="P Fitness Hub" width={193} height={124} className="h-[7.75rem] w-auto" />
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
              <li className="flex items-center gap-2"><MapPin size={16} className="shrink-0 text-brand-red" /> 157 Ikot Okoro Road, Abak</li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand-red" />
                <a href="tel:+2349071320603" className="hover:text-white">0907 132 0603</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand-red" />
                <a href="tel:+2349063770036" className="hover:text-white">0906 377 0036</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-brand-red" />
                <a href="mailto:pfitnesshub01@gmail.com" className="hover:text-white">pfitnesshub01@gmail.com</a>
              </li>
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
