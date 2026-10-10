import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For Partners",
  description:
    "Find considered cast and crew for film, streaming, advertising, branded content, and creative productions with Big Fish Collective.",
};

const capabilities = [
  [
    "Cast discovery",
    "Actors, presenters, voice talent, models, and performers aligned with character, language, audience, and format.",
  ],
  [
    "Crew sourcing",
    "Directors, writers, cinematographers, editors, art department talent, production specialists, and other crew.",
  ],
  [
    "Availability and coordination",
    "Profiles, dates, location, language, portfolio material, and key requirements gathered before conversations advance.",
  ],
  [
    "Commercial management",
    "Fee discussions, usage, deliverables, payment terms, and contracts managed through one point of contact.",
  ],
];

const reasons = [
  [
    "A shortlist with a point of view",
    "Recommendations shaped around the brief, not a generic list of names.",
  ],
  [
    "One accountable contact",
    "A dedicated account manager keeps talent, partners, and production details aligned.",
  ],
  [
    "Clear terms, early",
    "Expectations, fees, usage, and deliverables are discussed before work begins.",
  ],
  [
    "Ready for changing plans",
    "We identify backup options where possible and respond early when schedules shift.",
  ],
];

const steps = [
  [
    "Send the brief",
    "Share the role, format, language, dates, location, budget range, and decision timeline.",
  ],
  ["Align priorities", "We confirm the non-negotiables and clarify any gaps."],
  [
    "Review the shortlist",
    "Receive relevant profiles with the information needed to make a decision.",
  ],
  [
    "Meet and select",
    "We coordinate conversations, auditions, tests, or portfolio reviews as needed.",
  ],
  [
    "Confirm and deliver",
    "We align fees, terms, paperwork, and project communication.",
  ],
];

export default function PartnersPage() {
  return (
    <main>
      <section
        className="relative min-h-[700px] overflow-hidden bg-deep-ocean text-white sm:min-h-[780px]"
        aria-labelledby="partners-title"
      >
        <SiteHeader overlay />
        <img
          src="/03-for-partners-hero.png"
          alt="A producer, director and cinematographer reviewing a production monitor."
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          width={1672}
          height={941}
          style={{ objectPosition: "72% 50%" }}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[700px] max-w-360 items-end px-5 pb-16 pt-32 sm:min-h-[780px] sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-white/65">
              For partners · Hyderabad and beyond
            </p>
            <h1
              id="partners-title"
              className="mt-6 max-w-4xl font-sans text-[clamp(3.75rem,9vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.075em]"
            >
              The right talent.
              <br />
              <span className="font-normal">Ready for the work.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Share your brief and we will help you identify, evaluate, and
              engage cast or crew who fit the role, production, schedule, and
              budget.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-white px-6 text-ink hover:bg-white/85"
              >
                <Link href="/contact#project-brief">
                  Submit a Project Brief <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-white bg-black/20 px-6 text-white hover:bg-white hover:text-ink"
              >
                <Link href="#partner-process">
                  How We Work <ArrowDown />
                </Link>
              </Button>
            </div>
          </div>
          <a
            href="#partner-introduction"
            aria-label="Scroll to partner services"
            className="absolute bottom-8 right-5 grid size-12 place-items-center border border-white/50 text-white/80 transition-colors hover:bg-white hover:text-ink sm:right-8 lg:right-12"
          >
            <ArrowDown className="size-5" />
          </a>
        </div>
      </section>

      <section id="partner-introduction" className="bg-white">
        <div className="mx-auto grid max-w-360 gap-9 px-5 py-20 sm:px-8 lg:grid-cols-[0.48fr_1fr] lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">Who we support</p>
          <div>
            <h2 className="section-title max-w-5xl">
              For the people bringing the next production to life.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              We work with production houses, studios, filmmakers, OTT teams,
              casting directors, creative agencies, brands, and content
              companies. Support can cover one specialist role, a focused
              shortlist, or multiple departments across a production.
            </p>
          </div>
        </div>
      </section>

      <section id="partner-services" className="bg-ink text-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-white/45">What we can handle</p>
              <h2 className="section-title mt-5 max-w-xl">
                A focused search, managed end to end.
              </h2>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {capabilities.map(([title, copy], index) => (
                <article key={title} className="bg-ink p-6 sm:p-8">
                  <span className="text-xs tracking-wider text-white/45">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">Why partners choose Big Fish</p>
              <h2 className="section-title mt-5 max-w-xl">
                Good collaboration starts before the shoot.
              </h2>
            </div>
            <div className="grid gap-px bg-black/15 sm:grid-cols-2">
              {reasons.map(([title, copy], index) => (
                <article key={title} className="bg-paper p-6 sm:p-8">
                  <span className="text-xs tracking-wider text-ocean">
                    0{index + 1}
                  </span>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partner-process" className="bg-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">Partner process</p>
              <h2 className="section-title mt-5">
                From brief to confirmed team.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ink/60">
                A complete brief gives us a clearer starting point. We’ll
                confirm a realistic shortlist timeline after we understand the
                role and production needs.
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
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/15 py-5"
                >
                  <span className="text-sm text-ocean">0{index + 1}</span>
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

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-360 gap-9 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:px-12 lg:py-24">
          <div>
            <p className="eyebrow text-white/45">When plans change</p>
            <h2 className="section-title mt-5 max-w-xl">
              The process should not collapse.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/65">
            Productions move quickly. We maintain backup options where possible
            and respond early when availability, scope, or schedules shift. If a
            replacement is needed, we return to the brief and prioritise
            continuity.
          </p>
        </div>
      </section>

      <CtaBand
        title="Tell us who your project needs"
        copy="The more complete the brief, the faster we can return with useful options."
        primaryLabel="Submit a Project Brief"
        primaryHref="/contact#project-brief"
        secondaryLabel="Speak to Our Team"
        secondaryHref="/contact"
      />
      <SiteFooter />
    </main>
  );
}
