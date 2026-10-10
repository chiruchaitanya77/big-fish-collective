import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Find Talent",
  description:
    "Find considered cast and crew for film, streaming, advertising, branded content, and creative productions with Big Fish Collective.",
};

const capabilities = [
  [
    "Cast",
    "Actors, presenters, voice talent, models, and performers considered for character, language, audience, and format.",
  ],
  [
    "Crew",
    "Directors, writers, cinematographers, editors, art department talent, production specialists, and other crew.",
  ],
  [
    "Specialist roles",
    "Support across creative and production departments, from a single key hire to a wider team search.",
  ],
];

const steps = [
  [
    "Send the brief",
    "Share the role, format, language, dates, location, budget range, and decision timeline.",
  ],
  [
    "Align priorities",
    "We confirm the essentials, clarify open questions, and agree what a good match needs to bring.",
  ],
  [
    "Review options",
    "We prepare a focused shortlist with relevant profiles and the information needed to assess fit.",
  ],
  [
    "Meet and select",
    "We coordinate conversations, auditions, tests, or portfolio reviews as needed.",
  ],
  [
    "Confirm and deliver",
    "We align fees, usage, dates, deliverables, paperwork, and project communication.",
  ],
];

const briefDetails = [
  "Role or department",
  "Production format and creative direction",
  "Language, location, and dates",
  "Budget range and decision timeline",
];

export default function FindTalentPage() {
  return (
    <main>
      <SiteHeader />

      <section className="bg-white" aria-labelledby="find-talent-title">
        <div className="mx-auto grid max-w-360 lg:min-h-[680px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12 lg:py-24">
            <p className="eyebrow">Find talent · Hyderabad and beyond</p>
            <h1
              id="find-talent-title"
              className="mt-7 max-w-3xl font-sans text-[clamp(3.4rem,7.4vw,7.3rem)] font-medium leading-[0.88] tracking-[-0.075em]"
            >
              The right people.{" "}
              <span className="font-normal">Ready for the work.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Find cast and crew for film, streaming, advertising, branded
              content, and creative productions. Share your brief and we’ll help
              you identify, evaluate, and engage people who fit the role and
              production.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-ink px-6 text-white hover:bg-black/80"
              >
                <Link href="/contact#project-brief">
                  Submit a Project Brief <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-ink px-6 text-ink hover:bg-ink hover:text-white"
              >
                <Link href="#find-process">
                  How the Search Works <ArrowDown />
                </Link>
              </Button>
            </div>
            <div className="mt-14 grid max-w-xl grid-cols-2 gap-5 border-t border-black/15 pt-5 text-sm text-ink/55 sm:mt-20">
              <div>
                <span className="block text-2xl font-medium tracking-tight text-ink">
                  Cast
                </span>
                <span className="mt-1 block">
                  Talent shaped around the brief.
                </span>
              </div>
              <div>
                <span className="block text-2xl font-medium tracking-tight text-ink">
                  Crew
                </span>
                <span className="mt-1 block">
                  People who can bring it to life.
                </span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden bg-ink sm:min-h-[520px] lg:min-h-full">
            <img
              src="/06-find-talent-panel.png"
              alt="An actor delivering a scene during a casting rehearsal."
              className="absolute inset-0 h-full w-full object-cover object-[68%_center] grayscale"
              width={1254}
              height={1254}
              style={{ objectPosition: "55% 50%" }}
              decoding="async"
              fetchPriority="high"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
              aria-hidden="true"
            />
            <p className="absolute bottom-6 left-5 right-5 text-xs uppercase tracking-[0.18em] text-white/75 sm:bottom-9 sm:left-8 lg:left-10">
              A focused search. A team that stays with it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 border-b border-white/20 pb-10 lg:grid-cols-[0.65fr_1fr] lg:items-end lg:pb-14">
            <p className="eyebrow text-white/50">Who you can find</p>
            <div>
              <h2 className="max-w-4xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                A considered search across cast and crew.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                From a focused shortlist for one role to multiple departments
                across a production, the search begins with what the work needs.
              </p>
            </div>
          </div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-3">
            {capabilities.map(([title, copy], index) => (
              <article
                key={title}
                className="min-h-[270px] bg-ink p-6 sm:p-8 lg:p-10"
              >
                <span className="text-xs tracking-[0.16em] text-white/45">
                  0{index + 1}
                </span>
                <h3 className="mt-9 text-2xl font-medium tracking-[-0.035em]">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/60">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="find-process" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow">A clear process</p>
              <h2 className="mt-5 max-w-xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                From brief to confirmed team.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ink/60">
                A complete brief helps us understand what matters and return
                with relevant options. We’ll confirm a realistic shortlist
                timeline once we understand the role and production needs.
              </p>
              <Button
                asChild
                className="mt-7 h-12 rounded-none bg-ink px-6 text-white hover:bg-black/80"
              >
                <Link href="/contact#project-brief">
                  Submit a Project Brief <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <ol className="m-0 list-none p-0">
              {steps.map(([title, copy], index) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/15 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5"
                >
                  <span className="text-sm text-black/40">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-ink/60">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-360 gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.65fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="eyebrow">A useful starting point</p>
            <h2 className="mt-5 max-w-xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              Help us understand the brief.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/60">
              Share what you know now. We can clarify the details together
              before the search moves forward.
            </p>
          </div>
          <ul className="m-0 list-none border-t border-black/15 p-0">
            {briefDetails.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-black/15 py-5 text-lg"
              >
                <span className="text-sm text-black/40">0{index + 1}</span>
                <span className="flex items-center gap-3">
                  {item}
                  <Check className="ml-auto size-4 shrink-0 text-black/45" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Have a project taking shape?"
        copy="Tell us who you need, when you need them, and what the work calls for. We’ll take it from there."
        primaryLabel="Submit a Project Brief"
        primaryHref="/contact#project-brief"
        secondaryLabel="How We Work"
        secondaryHref="/process"
      />
      <SiteFooter />
    </main>
  );
}
