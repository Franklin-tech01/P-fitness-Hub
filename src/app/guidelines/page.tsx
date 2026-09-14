import Image from "next/image";
import Link from "next/link";
import {
  ClipboardCheck,
  Sparkles,
  ShieldAlert,
  Users,
  Dumbbell,
  Clock,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { PLANS, SESSION_TIMETABLE, formatNaira } from "@/lib/plans";
import Reveal from "@/components/Reveal";

const RULE_SECTIONS = [
  {
    icon: ClipboardCheck,
    title: "1. Membership & Check-In",
    rules: [
      "All members must complete registration and select a valid membership package before accessing the gym.",
      "Membership is personal and must not be shared, transferred or used by another person.",
      "Members must check in at the reception before every gym session or class.",
      "Only members with an active membership or valid daily pass will be permitted to use the gym facilities.",
      "Members must provide their membership details or identification when requested by staff.",
      "Members are responsible for ensuring that their membership remains active.",
      "Management reserves the right to refuse access to anyone without a valid membership.",
    ],
  },
  {
    icon: Sparkles,
    title: "2. Hygiene & Cleanliness",
    rules: [
      "Members must maintain good personal hygiene while using the gym.",
      "Appropriate and clean workout clothing must be worn at all times.",
      "Proper sports shoes must be worn in the workout area.",
      "Members must use a clean towel when using benches, mats or other shared equipment.",
      "All equipment must be wiped down after use.",
      "Members must dispose of waste in the appropriate bins.",
      "Food and drinks, except permitted beverages such as water, are not allowed in the workout area.",
      "Members must keep changing rooms, toilets and other shared areas clean.",
      "Spitting or any other unhygienic behaviour within the gym premises is strictly prohibited.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "3. Health & Safety",
    rules: [
      "Members are encouraged to consult a qualified medical professional before beginning an exercise programme where necessary.",
      "Members must inform the trainer or management of any injury, medical limitation or condition that may affect their ability to exercise safely.",
      "Members must follow all safety instructions given by trainers and gym staff.",
      "Do not use gym equipment beyond your physical ability.",
      "Members must stop exercising and notify a trainer if they feel dizzy, unwell, injured or experience unusual pain.",
      "Emergency exits and safety equipment must remain accessible at all times.",
      "Running, pushing, fighting or any activity that may endanger other members is prohibited.",
      "Smoking, alcohol and illegal substances are strictly prohibited on the gym premises.",
      "Any accident, injury or unsafe condition must be reported immediately to management.",
    ],
  },
  {
    icon: Users,
    title: "4. Conduct & Behaviour",
    rules: [
      "Members must treat other members, trainers and staff with respect.",
      "Abusive language, harassment, bullying, intimidation and discrimination are not permitted.",
      "Fighting or threatening behaviour will not be tolerated.",
      "Members must respect other people's personal space and privacy.",
      "Excessive noise or behaviour that disrupts other members is prohibited.",
      "Members must not engage in any unlawful activity within the gym premises.",
      "Taking photographs or videos of other members without their consent is prohibited.",
      "Any form of sexual harassment or inappropriate behaviour is strictly prohibited.",
      "Management reserves the right to suspend or terminate the membership of any person who seriously or repeatedly violates these rules.",
    ],
  },
  {
    icon: Dumbbell,
    title: "5. Equipment Use & Care",
    rules: [
      "All gym equipment must be used only for its intended purpose.",
      "Members must follow the instructions provided by trainers or displayed on the equipment.",
      "Weights, dumbbells and other equipment must be returned to their proper positions after use.",
      "Do not drop, throw or deliberately misuse weights or equipment.",
      "Members must not attempt to repair, modify or dismantle gym equipment.",
      "Report damaged or faulty equipment to staff immediately.",
      "Members may be held responsible for damage caused by intentional misuse or negligence.",
      "Allow other members reasonable access to equipment, particularly during busy periods.",
      "Do not occupy equipment unnecessarily when other members are waiting.",
    ],
  },
  {
    icon: Clock,
    title: "6. Punctuality",
    rules: [
      "Members are expected to arrive on time for scheduled gym classes.",
      "Members attending classes should arrive at least 10 minutes before the scheduled start time.",
      "Members who arrive late may be required to wait until the appropriate time before joining a class, particularly where late entry may affect safety or disrupt the session.",
      "Each class must end at its scheduled time to allow the next class to begin promptly.",
      "Members are expected to respect the gym's class timetable and operating hours.",
    ],
  },
  {
    icon: Wallet,
    title: "7. Payment Policy",
    rules: [
      "All membership fees must be paid before access to the gym is granted.",
      "Membership packages are activated upon confirmation of payment.",
      "Members must renew their membership before or upon expiration to continue using the gym.",
      "Membership fees are generally non-refundable once the membership has been activated, except where management approves otherwise.",
      "Membership cannot be transferred to another person without prior approval from management.",
      "Daily and weekly members must make payment before accessing the gym for the relevant period.",
      "Members are responsible for keeping their payment and membership records.",
      "Any promotional price, discount or special package is subject to the terms communicated by management.",
      "Management reserves the right to review membership prices and package terms when necessary, with reasonable notice to members.",
    ],
  },
];

export default function GuidelinesPage() {
  return (
    <div>
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-brand-black text-white">
        <Image
          src={IMAGES.coaching}
          alt="Trainer guiding a member at P Fitness Hub"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/40" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-blue-light">
            Membership, Sessions &amp; Guidelines
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Gym Rules &amp; Guidelines
          </h1>
          <p className="mt-4 text-white/70">
            Please read and comply with these rules to help us maintain a
            safe, clean and welcoming environment for every member.
          </p>
        </div>
      </section>

      {/* Timetable + Plans recap */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Gym Session Timetable</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
              <div className="bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wider text-white">
                Morning Session
              </div>
              {SESSION_TIMETABLE.morning.map((s, i) => (
                <div key={s.name} className={`flex justify-between px-6 py-3 text-sm ${i % 2 ? "bg-brand-gray-light" : "bg-white"}`}>
                  <span className="font-medium">{s.name}</span>
                  <span className="text-brand-gray">{s.time}</span>
                </div>
              ))}
              <div className="bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white">
                Evening Session
              </div>
              {SESSION_TIMETABLE.evening.map((s, i) => (
                <div key={s.name} className={`flex justify-between px-6 py-3 text-sm ${i % 2 ? "bg-brand-gray-light" : "bg-white"}`}>
                  <span className="font-medium">{s.name}</span>
                  <span className="text-brand-gray">{s.time}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-2xl font-bold">Membership Packages</h2>
            <div className="mt-6 space-y-4">
              {PLANS.map((plan) => (
                <div key={plan.id} className="rounded-2xl border border-black/10 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold">{plan.name.toUpperCase()} PLAN</h3>
                    <span className="text-sm font-semibold text-brand-blue">
                      {plan.options.map((o) => formatNaira(o.amountNaira)).join(" • ")}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-brand-gray">
                    {plan.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-brand-gray-light py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold">Gym Rules &amp; Guidelines</h2>
            <p className="mt-3 text-brand-gray">
              Please read and comply with these rules to maintain a safe,
              clean and welcoming environment.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {RULE_SECTIONS.map((section, idx) => (
              <Reveal key={section.title} delay={(idx % 2) * 100}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                      <section.icon size={20} />
                    </span>
                    <h3 className="font-display font-bold">{section.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-brand-black/75">
                    {section.rules.map((rule) => (
                      <li key={rule} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agreement note */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-bold">Member&apos;s Agreement</h2>
          <p className="mt-4 text-brand-gray">
            By registering with P Fitness Hub Limited, you confirm that you
            have read, understood and agree to comply with these membership
            terms, gym rules and guidelines.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-red/30 transition hover:bg-brand-red-light"
          >
            Agree &amp; Join Now <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
