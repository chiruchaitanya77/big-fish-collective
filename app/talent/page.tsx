import type { Metadata } from "next";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For Talent",
  description:
    "Build your creative career with representation, relevant opportunities, practical career guidance, and business support from Big Fish Collective.",
};

const disciplines = [
  [
    "Cast and performers",
    "Actors, presenters, voice talent, models, and on-screen performers.",
  ],
  [
    "Writers and directors",
    "Screenwriters, filmmakers, directors, and creative storytellers.",
  ],
  [
    "Camera and post",
    "Cinematographers, photographers, editors, colourists, sound professionals, and VFX talent.",
  ],
  [
    "Production and design",
    "Producers, production professionals, art department talent, stylists, choreographers, and specialist crew.",
  ],
];

const support = [
  [
    "Career strategy",
    "We map your current strengths, the work you want to be known for, and the experience you need next.",
  ],
  [
    "Opportunity matching",
    "We introduce work that fits your profile, availability, goals, and professional readiness.",
  ],
  [
    "Negotiation and contracts",
    "Your account manager coordinates fees, usage, dates, deliverables, and contract discussions.",
  ],
  [
    "Profile and positioning",
    "We organise the profile, portfolio, credits, showreel, availability, and professional focus partners need.",
  ],
  [
    "Ongoing support",
    "We stay involved through the project and review what each experience means for your next step.",
  ],
];

const criteria = [
  "Strong craft or clear potential, supported by work samples",
  "Professional communication and dependable availability",
  "A willingness to prepare, take feedback, and keep developing",
  "Respect for collaborators, agreements, and production realities",
];

const process = [
  [
    "Apply",
    "Share your profile, portfolio, credits, location, languages, and goals.",
  ],
  [
    "Review",
    "Our team assesses fit, readiness, and the categories we are currently developing.",
  ],
  [
    "Conversation",
    "Selected applicants meet the team to discuss expectations and direction.",
  ],
  [
    "Agreement",
    "We explain the working model, commission, and responsibilities before onboarding.",
  ],
  [
    "Launch",
    "We prepare your profile, identify priorities, and begin relevant outreach and matching.",
  ],
];

export default function TalentPage() {
  return (
    <main>
      <section
        className="relative min-h-[720px] overflow-hidden bg-deep-ocean text-white sm:min-h-[780px]"
        aria-labelledby="talent-title"
      >
        <SiteHeader overlay />
        <img
          src="/02-for-talent-hero.png"
          alt="A performer listening thoughtfully during a studio rehearsal."
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          width={1672}
          height={941}
          style={{ objectPosition: "72% 50%" }}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[720px] max-w-360 items-end px-5 pb-16 pt-32 sm:min-h-[780px] sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-white/65">For talent · Worldwide</p>
            <h1
              id="talent-title"
              className="mt-6 max-w-4xl font-sans text-[clamp(3.75rem,9vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.075em]"
            >
              Build a career{" "}
              <span className="font-normal">with direction.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              You bring the craft, discipline, and ambition. We bring market
              knowledge, honest guidance, relevant opportunities, and the
              business support that helps you move with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-white px-6 text-ink hover:bg-white/85"
              >
                <Link href="/contact#talent-application">
                  Apply for Representation <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-white bg-black/20 px-6 text-white hover:bg-white hover:text-ink"
              >
                <Link href="#representation-process">
                  See How It Works <ArrowDown />
                </Link>
              </Button>
            </div>
          </div>
          <a
            href="#talent-introduction"
            aria-label="Scroll to talent representation"
            className="absolute bottom-8 right-5 grid size-12 place-items-center border border-white/50 text-white/80 transition-colors hover:bg-white hover:text-ink sm:right-8 lg:right-12"
          >
            <ArrowDown className="size-5" />
          </a>
        </div>
      </section>

      <section id="talent-introduction" className="bg-white">
        <div className="mx-auto grid max-w-360 gap-9 px-5 py-20 sm:px-8 lg:grid-cols-[0.48fr_1fr] lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">Representation with purpose</p>
          <div>
            <h2 className="section-title max-w-5xl">
              More than the next opportunity. A clearer path to the work you
              want to be known for.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Representation is selective because every person in the collective
              should receive meaningful attention. We look at where you are now,
              where you want to go, and what kind of support can help you get
              there.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="eyebrow text-white/45">Who we represent</p>
              <h2 className="section-title mt-5 max-w-xl">
                Emerging and established talent across cast and crew.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                We work across creative and production disciplines, with
                representation shaped around the categories we can actively
                support.
              </p>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {disciplines.map(([title, copy], index) => (
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

      <section id="representation-includes" className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">What representation includes</p>
              <h2 className="section-title mt-5">
                Support for the work and what comes next.
              </h2>
            </div>
            <div className="border-t border-black/15">
              {support.map(([title, copy], index) => (
                <article
                  key={title}
                  className="grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[3.5rem_0.7fr_1fr] sm:gap-5"
                >
                  <span className="text-sm text-ocean">0{index + 1}</span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="leading-relaxed text-ink/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-360 gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="eyebrow text-ocean">What we look for</p>
            <h2 className="section-title mt-5 max-w-xl">
              Craft, readiness, and respect for the work.
            </h2>
          </div>
          <ul className="m-0 list-none p-0">
            {criteria.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/15 py-5 text-lg leading-relaxed"
              >
                <span className="text-sm text-ocean">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="representation-process" className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">Representation process</p>
              <h2 className="section-title mt-5">
                A clear first conversation. A thoughtful next step.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ink/60">
                Applying does not guarantee representation or work. If there is
                a fit, we will explain the working model before anything is
                agreed.
              </p>
              <Button
                asChild
                className="mt-7 h-12 rounded-none bg-ink px-6 text-white hover:bg-black/80"
              >
                <Link href="/contact#talent-application">
                  Start an Application <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <ol className="m-0 list-none p-0">
              {process.map(([title, copy], index) => (
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

      <section className="bg-ocean text-white">
        <div className="mx-auto grid max-w-360 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20">
          <div>
            <p className="eyebrow text-white/55">Join the collective</p>
            <h2 className="mt-4 max-w-3xl font-sans text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-6xl">
              Ready to look beyond the next job?
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Tell us what you do, where you want to go, and why now is the
              right time.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-white px-6 text-ink hover:bg-white/85"
          >
            <Link href="/contact#talent-application">
              Apply for Representation <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
