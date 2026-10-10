import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How We Work",
  description: "See how Big Fish Collective understands each brief, builds considered matches, aligns expectations, and supports the work through delivery.",
};

const steps = [
  ["01", "Discovery", "We begin by understanding the person or project: craft, goals, role, format, direction, dates, budget, and how decisions will be made."],
  ["02", "Assessment", "We consider capability, experience, ambition, working style, logistics, and the real demands of the work."],
  ["03", "Matching", "We develop a relevant shortlist or recommend an opportunity. A manager reviews the fit before an introduction moves forward."],
  ["04", "Alignment", "We coordinate conversations, auditions, tests, portfolio reviews, and questions so everyone has the context to make a considered choice."],
  ["05", "Commercial confirmation", "Before work begins, we align fees, usage, dates, deliverables, payment terms, and working conditions."],
  ["06", "Project support", "We stay available through delivery, help manage changes, and keep communication clear between the people involved."],
  ["07", "Review", "After completion, we gather useful feedback and carry relevant learnings into the next opportunity or project."],
];

const principles = [
  ["Clear from the start", "We ask the right questions early so expectations, timelines, and practical details are understood."],
  ["Considered matches", "Every introduction is based on the brief and the people involved, with a manager reviewing the fit."],
  ["One accountable team", "A consistent point of contact helps keep conversations and decisions moving."],
];

export default function ProcessPage() {
  return (
    <main>
      <SiteHeader />

      <section className="bg-white" aria-labelledby="process-title">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[660px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12 lg:py-24">
            <p className="eyebrow">How we work · Hyderabad and beyond</p>
            <h1 id="process-title" className="mt-7 max-w-3xl font-sans text-[clamp(3.4rem,7.4vw,7.3rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              One clear process. <span className="font-normal">Better work together.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Good matches depend on good information. We first understand the person or project, then manage the details that turn an introduction into a productive working relationship.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-none bg-ink px-6 text-white hover:bg-black/80">
                <Link href="/contact">Start a Conversation <ArrowUpRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-none border-ink px-6 text-ink hover:bg-ink hover:text-white">
                <Link href="#process-steps">See the Process <ArrowDown /></Link>
              </Button>
            </div>
            <div className="mt-14 border-t border-black/15 pt-5 sm:mt-20">
              <p className="text-xs uppercase tracking-[0.16em] text-ink/45">From first conversation to final review</p>
              <p className="mt-2 text-2xl font-medium tracking-tight">Seven steps. A team beside you.</p>
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden bg-ink sm:min-h-[520px] lg:min-h-full">
            <img src="/05-how-we-work-panel.png" alt="Two production professionals reviewing storyboards and planning a project." className="absolute inset-0 h-full w-full object-cover object-[68%_center] grayscale" width={1254} height={1254} style={{ objectPosition: "50% 50%" }} decoding="async" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-6 left-5 right-5 text-xs uppercase tracking-[0.18em] text-white/75 sm:bottom-9 sm:left-8 lg:left-10">A thoughtful process, made for real projects.</p>
          </div>
        </div>
      </section>

      <section id="process-steps" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 border-b border-white/20 pb-10 lg:grid-cols-[0.65fr_1fr] lg:items-end lg:pb-14">
            <p className="eyebrow text-white/50">The process</p>
            <div>
              <h2 className="max-w-4xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl">From understanding the need to learning from the work.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">The steps flex to the scale of the engagement. The focus stays on a clear brief, a considered match, and good communication.</p>
            </div>
          </div>

          <ol className="m-0 list-none p-0">
            {steps.map(([number, title, copy]) => (
              <li key={number} className="grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[4.5rem_0.8fr_1.2fr] sm:gap-7 sm:py-9 lg:grid-cols-[6rem_0.8fr_1.2fr]">
                <span className="text-sm tracking-[0.14em] text-white/45">{number}</span>
                <h3 className="font-sans text-2xl font-medium tracking-[-0.035em] sm:text-3xl">{title}</h3>
                <p className="max-w-2xl leading-relaxed text-white/60">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow">What guides us</p>
              <h2 className="mt-5 max-w-xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-5xl">Good collaboration is built in the details.</h2>
            </div>
            <div className="grid gap-px bg-black/15 sm:grid-cols-3">
              {principles.map(([title, copy], index) => (
                <article key={title} className="bg-white p-6 sm:p-7 lg:p-8">
                  <span className="text-xs tracking-[0.16em] text-ink/40">0{index + 1}</span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.65fr_1fr] lg:px-12 lg:py-20">
          <p className="eyebrow">When plans change</p>
          <div>
            <h2 className="max-w-3xl font-sans text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">Keep the conversation open.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">Production plans and working relationships can shift. We return to the agreed brief and terms, clarify what has changed, and coordinate a practical next step with the people involved.</p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
              <Link href="/talent" className="inline-flex items-center gap-2 border-b border-black pb-1 transition-opacity hover:opacity-60">For Talent <ArrowUpRight className="size-4" /></Link>
              <Link href="/partners" className="inline-flex items-center gap-2 border-b border-black pb-1 transition-opacity hover:opacity-60">For Partners <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Clarity first. Better work follows."
        copy="Tell us where you are starting from, and we will help map the next step."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="For Talent"
        secondaryHref="/talent"
      />
      <SiteFooter />
    </main>
  );
}
