import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, HeartPulse, Users, Trophy } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { IMAGES } from "@/lib/images";
import PricingCard from "@/components/PricingCard";
import Timetable from "@/components/Timetable";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description: "Full range of free weights, machines and cardio equipment kept in top condition.",
  },
  {
    icon: HeartPulse,
    title: "Expert Trainers",
    description: "Certified instructors leading classes and offering specialized one-on-one guidance.",
  },
  {
    icon: Users,
    title: "Motivating Community",
    description: "Train alongside members who push each other to show up and level up.",
  },
  {
    icon: Trophy,
    title: "Real Results",
    description: "Structured sessions and flexible plans built around your goals, not ours.",
  },
];

const GALLERY = [IMAGES.interior, IMAGES.training, IMAGES.classSession, IMAGES.dumbbells, IMAGES.stretching, IMAGES.gymFloor];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-brand-black text-white">
        <Image
          src={IMAGES.hero}
          alt="Athlete training with weights at P Fitness Hub"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/30" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-block rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-red-light">
              P Fitness Hub Limited
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              TRAIN. SWEAT.{" "}
              <span className="text-brand-blue-light">GROW.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Flexible memberships, expert-led classes and a gym built for
              every stage of your fitness journey. Your transformation starts
              the moment you walk in.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-brand-red px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-red/30 transition hover:bg-brand-red-light"
              >
                Join Now <ArrowRight size={18} />
              </Link>
              <Link
                href="#plans"
                className="rounded-full border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
              >
                View Plans
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
            <StatCounter value={1200} suffix="+" label="Active Members" />
            <StatCounter value={15} suffix="+" label="Expert Trainers" />
            <StatCounter value={6} label="Classes Daily" />
            <StatCounter value={7} label="Days A Week" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Why P Fitness Hub</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Everything you need to reach your goals
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 100}>
              <div className="h-full rounded-2xl border border-black/5 bg-brand-gray-light p-8 transition hover:border-brand-blue/40 hover:bg-white hover:shadow-lg">
                <feature.icon className="text-brand-blue" size={28} />
                <h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand-gray">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-brand-gray-light py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Inside The Hub</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A space built for performance</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((src, idx) => (
              <Reveal key={src} delay={idx * 80} className={idx === 0 ? "col-span-2 row-span-2" : ""}>
                <div className={`relative overflow-hidden rounded-2xl ${idx === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"}`}>
                  <Image
                    src={src}
                    alt="P Fitness Hub gym facility"
                    fill
                    className="object-cover transition duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Class Schedule</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Session Timetable</h2>
          <p className="mt-3 text-brand-gray">Pick a session that fits your day. Morning or evening, we&apos;ve got you covered.</p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <Timetable />
        </Reveal>
      </section>

      {/* Pricing */}
      <section id="plans" className="bg-brand-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center text-white">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-blue-light">Membership Packages</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Choose your plan</h2>
            <p className="mt-3 text-white/60">
              Simple, transparent pricing. Switch or upgrade anytime.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan, idx) => (
              <Reveal key={plan.id} delay={idx * 120}>
                <PricingCard plan={plan} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <Image
          src={IMAGES.strengthTraining}
          alt="Member lifting weights"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-blue/60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to start your transformation?
            </h2>
            <p className="mt-4 text-white/70">
              Sign up today, choose your plan and pay securely online. Your
              first session is just a click away.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-red/30 transition hover:bg-brand-red-light"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
