import Link from "@/components/site-link";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Clapperboard,
  Compass,
  UsersRound,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { FilmTicker } from "@/components/film-ticker";

const strengths = [
  [
    "Curated matching",
    "Every recommendation considers skill, experience, ambition, working style, and project fit.",
  ],
  [
    "Human representation",
    "Dedicated managers guide conversations, align expectations, and keep work moving.",
  ],
  [
    "Clear commercial terms",
    "Fees, usage, deliverables, dates, and contracts are aligned early and documented properly.",
  ],
  [
    "Long-term thinking",
    "We help talent make career decisions and partners build relationships worth repeating.",
  ],
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-190 overflow-hidden bg-deep-ocean text-white sm:min-h-205">
        <SiteHeader overlay />
        <img
          src="/01-home-hero.png"
          alt="A director and cinematographer preparing a performer on a film set."
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          width={1672}
          height={941}
          style={{ objectPosition: "68% 50%" }}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-190 max-w-360 items-end px-5 pb-16 pt-32 sm:min-h-205 sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-seafoam">
              A worldwide talent collective
            </p>
            <h1 className="mt-6 font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.84] tracking-[-0.065em]">
              Big talent deserves a{" "}
              <em className="font-normal text-seafoam">bigger stage.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
              We represent ambitious cast and crew, guide long-term careers, and
              connect creative partners with people who fit the work, timeline,
              and team.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-white px-6 text-ink hover:bg-white/85"
              >
                <Link href="/find-talent">
                  Find Talent <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-white bg-black/20 px-6 text-white hover:bg-white hover:text-ink"
              >
                <Link href="/contact#talent-application">
                  Join the Collective
                </Link>
              </Button>
            </div>
          </div>
          <a
            href="#introduction"
            aria-label="Scroll to introduction"
            className="absolute bottom-8 right-5 grid size-12 place-items-center border border-white/50 text-white/70 hover:bg-white hover:text-ink sm:right-8 lg:right-12"
          >
            <ArrowDown className="size-5" />
          </a>
        </div>
      </section>

      <FilmTicker />

      <section className="border-b border-black/10 bg-ink text-white">
        <div className="mx-auto grid max-w-360 grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
          {[
            "Talent representation",
            "Casting and crew sourcing",
            "Career strategy",
            "Production partnerships",
          ].map((item, index) => (
            <div key={item} className="bg-ink px-5 py-6 sm:px-8">
              <span className="text-xs text-seafoam">0{index + 1}</span>
              <p className="mt-2 text-sm leading-snug text-white/75">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="introduction" className="bg-paper">
        <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-32">
          <div>
            <p className="eyebrow text-ocean">Who we are</p>
          </div>
          <div>
            <h2 className="section-title max-w-5xl">
              Built for careers,{" "}
              <em className="font-normal text-ocean">not just call sheets.</em>
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Big Fish Collective is a Hyderabad-based talent agency for people
              who want more than the next gig. We help cast and crew build clear
              career paths, while giving producers, studios, agencies, and
              brands a dependable way to find and manage the right talent.
            </p>
            <Button
              asChild
              variant="link"
              className="mt-5 h-auto p-0 text-ocean"
            >
              <Link href="/about">
                Meet Big Fish Collective <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-360 lg:grid-cols-2">
          <article className="border-b border-black/10 p-7 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
            <UsersRound className="size-9 text-ocean" />
            <p className="eyebrow mt-12 text-ocean">I am talent</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Build a career with direction.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60">
              Find representation, relevant opportunities, practical career
              guidance, and a team that understands where you want to go.
            </p>
            <Link
              href="/talent"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-ocean"
            >
              Explore representation <ArrowUpRight className="size-4" />
            </Link>
          </article>
          <article className="p-7 sm:p-12 lg:p-16">
            <Clapperboard className="size-9 text-ocean" />
            <p className="eyebrow mt-12 text-ocean">I am hiring</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Find the right people without the usual friction.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60">
              Share your brief and receive a focused shortlist of cast or crew
              selected for the role, schedule, and production.
            </p>
            <Link
              href="/contact#project-brief"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-ocean"
            >
              Submit a project brief <ArrowUpRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">Why Big Fish</p>
              <h2 className="section-title mt-5">
                Better matches start with better understanding.
              </h2>
            </div>
            <div className="grid gap-px bg-black/15 sm:grid-cols-2">
              {strengths.map(([title, copy], index) => (
                <article key={title} className="bg-paper p-7 sm:p-9">
                  <span className="text-xs font-semibold tracking-wider text-ocean">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-165 overflow-hidden bg-deep-ocean text-white">
        <img
          src="/07-home-hyderabad-panorama.png"
          alt="Location scouts looking over a city from a landscape of granite boulders."
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-45"
          width={1853}
          height={849}
          style={{ objectPosition: "80% 50%", opacity: 1 }}
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep-ocean via-deep-ocean/90 to-transparent" />
        <div className="relative mx-auto grid min-h-165 max-w-360 items-center px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="eyebrow text-seafoam">Hyderabad and beyond</p>
            <h2 className="section-title mt-5 max-w-3xl">
              Rooted here. Ready for wider waters.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
              Hyderabad brings together experienced crews, new voices, strong
              production capability, and connections to creative talent
              worldwide. We make that ecosystem easier to access.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-none border-white bg-transparent text-white hover:bg-white hover:text-ink"
            >
              <Link href="/hyderabad">
                Why Hyderabad <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.5fr_1fr]">
            <div>
              <p className="eyebrow text-ocean">How it works</p>
              <h2 className="mt-5 font-serif text-5xl tracking-tight">
                One brief. One accountable team.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                [
                  Compass,
                  "Tell us what you need",
                  "Share a project brief, role, or career goal.",
                ],
                [
                  UsersRound,
                  "Meet the right people",
                  "We review fit and create a focused match or shortlist.",
                ],
                [
                  BriefcaseBusiness,
                  "Move with clarity",
                  "We coordinate conversations, terms, contracts, and support.",
                ],
              ].map(([Icon, title, text], index) => {
                const I = Icon as typeof Compass;
                return (
                  <article key={String(title)}>
                    <I className="size-7 text-ocean" />
                    <span className="mt-10 block text-xs text-ink/35">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold">
                      {String(title)}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink/60">
                      {String(text)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
