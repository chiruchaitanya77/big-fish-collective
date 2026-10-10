import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: "Talent representation, casting, crew sourcing, career strategy, negotiation, training, and production partnerships.",
};

const services = [
  {
    number: "01",
    title: "Talent representation",
    audience: "For talent",
    copy: "Long-term support for cast and crew: career direction, opportunity review, negotiation, contracts, and project guidance.",
    action: "Explore Talent Representation",
    href: "/talent",
  },
  {
    number: "02",
    title: "Casting and talent search",
    audience: "For productions",
    copy: "A focused search across screen, voice, advertising, branded content, and digital work, shaped around the brief.",
    action: "Start a Talent Search",
    href: "/contact#project-brief",
  },
  {
    number: "03",
    title: "Crew sourcing",
    audience: "For productions",
    copy: "Find the right people across development, direction, camera, art, sound, post-production, styling, choreography, and specialist departments.",
    action: "Find Crew",
    href: "/contact#project-brief",
  },
  {
    number: "04",
    title: "Career strategy",
    audience: "For talent",
    copy: "Define your professional focus, identify experience gaps, and make more considered choices about the work ahead.",
    action: "Talk About Your Career",
    href: "/contact#talent-application",
  },
  {
    number: "05",
    title: "Negotiation and contracts",
    audience: "For talent and partners",
    copy: "Bring clarity to fees, usage, dates, deliverables, expenses, payment terms, and working conditions before work begins.",
    action: "Discuss Your Requirement",
    href: "/contact",
  },
  {
    number: "06",
    title: "Consulting and training",
    audience: "For teams and talent",
    copy: "Practical sessions covering market readiness, auditions, portfolios, professional conduct, project communication, and working with represented talent.",
    action: "Ask About Training",
    href: "/contact",
  },
  {
    number: "07",
    title: "Production partnerships",
    audience: "For partners",
    copy: "Ongoing support for companies that need regular access to dependable cast or crew and a simpler way to manage repeat engagements.",
    action: "Explore Partner Support",
    href: "/partners",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />

      <section className="bg-white" aria-labelledby="services-title">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[690px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12 lg:py-24">
            <p className="eyebrow">Services · Hyderabad and beyond</p>
            <h1 id="services-title" className="mt-7 max-w-3xl font-sans text-[clamp(3.4rem,7.4vw,7.3rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              Good work starts with the <span className="font-normal">right support.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Big Fish Collective brings representation, talent search, and production support together. A clear brief or an honest conversation is enough to find the right place to begin.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-none bg-ink px-6 text-white hover:bg-black/80">
                <Link href="/contact">Discuss Your Requirement <ArrowUpRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-none border-ink px-6 text-ink hover:bg-ink hover:text-white">
                <Link href="#service-index">Explore Services <ArrowDown /></Link>
              </Button>
            </div>
            <div className="mt-14 grid max-w-xl grid-cols-2 gap-5 border-t border-black/15 pt-5 text-sm text-ink/55 sm:mt-20">
              <div><span className="block text-2xl font-medium tracking-tight text-ink">For talent</span><span className="mt-1 block">Build a career with direction.</span></div>
              <div><span className="block text-2xl font-medium tracking-tight text-ink">For partners</span><span className="mt-1 block">Assemble the right team.</span></div>
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden bg-ink sm:min-h-[520px] lg:min-h-full">
            <img src="/04-services-panel.png" alt="A camera technician adjusting the focus of a cinema camera." className="absolute inset-0 h-full w-full object-cover object-[68%_center] grayscale" width={1254} height={1254} style={{ objectPosition: "50% 50%" }} decoding="async" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-6 left-5 right-5 text-xs uppercase tracking-[0.18em] text-white/75 sm:bottom-9 sm:left-8 lg:left-10">One collective. Every part of the process.</p>
          </div>
        </div>
      </section>

      <section id="service-index" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 border-b border-white/20 pb-10 lg:grid-cols-[0.65fr_1fr] lg:items-end lg:pb-14">
            <p className="eyebrow text-white/50">What we do</p>
            <div>
              <h2 className="max-w-4xl font-sans text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl">A connected set of services, shaped around the work.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">Choose a starting point. We can shape the support around a single need or a larger production requirement.</p>
            </div>
          </div>

          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            {services.map((service) => (
              <article key={service.number} className="group flex min-h-[290px] flex-col bg-ink p-6 sm:p-8 lg:min-h-[320px] lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs tracking-[0.16em] text-white/45">{service.number}</span>
                  <span className="text-right text-xs uppercase tracking-[0.14em] text-white/45">{service.audience}</span>
                </div>
                <h3 className="mt-9 max-w-md font-sans text-2xl font-medium leading-tight tracking-[-0.035em] sm:text-3xl">{service.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-white/60">{service.copy}</p>
                <Link href={service.href} className="mt-auto flex w-fit items-center gap-2 pt-8 text-sm font-medium text-white transition-colors hover:text-white/65 focus-visible:outline-white">
                  {service.action}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.65fr_1fr] lg:px-12 lg:py-20">
          <p className="eyebrow">How to begin</p>
          <div>
            <h2 className="max-w-3xl font-sans text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">Tell us what you are working toward.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">Share the role, production, career question, or support you need. We will come back with a clear next step.</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-medium transition-opacity hover:opacity-60">Discuss Your Requirement <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need support across more than one category?"
        copy="Tell us what you are making or where you want to go. We will recommend a clear way to structure the support."
        primaryLabel="Discuss Your Requirement"
        primaryHref="/contact"
        secondaryLabel="Explore For Talent"
        secondaryHref="/talent"
      />
      <SiteFooter />
    </main>
  );
}
