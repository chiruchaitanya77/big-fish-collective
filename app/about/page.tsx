import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Big Fish Collective develops creative careers and connects producers, studios, agencies, and brands with cast and crew.",
};

const beliefs = [
  [
    "Careers over gigs",
    "A single project matters. The decisions around it should also support the person’s longer career.",
  ],
  [
    "Fit over volume",
    "A smaller, relevant shortlist serves a production better than a large directory of names.",
  ],
  [
    "Clarity builds trust",
    "Expectations, fees, deliverables, and contracts should be explained early and documented properly.",
  ],
  [
    "Support improves performance",
    "Professional guidance, honest feedback, and respectful communication help people do their best work.",
  ],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-black bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-16 text-[clamp(12rem,28vw,30rem)] font-bold leading-none tracking-widest text-black/[0.035]"
        >
          BFC
        </div>

        <div className="relative mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.65fr] lg:px-12 lg:py-20">
          <div>
            <p className="eyebrow">About Big Fish</p>
            <h1 className="display-title mt-5 max-w-4xl">
              A talent agency built around people, not transactions.
            </h1>
          </div>

          <div className="flex flex-col justify-end border-l border-black pl-6 lg:pl-10">
            <img
              src="/we_believe.png"
              alt=""
              aria-hidden="true"
              className="motion-inline-illustration motion-parallax-media mb-8 w-full max-w-md"
              width={420}
              height={240}
              loading="lazy"
              decoding="async"
            />

            <p className="max-w-xl text-lg leading-relaxed text-black/65 sm:text-xl">
              We believe representation should create direction, not dependency.
              Our role is to understand people deeply, open the right doors, and
              make every working relationship clearer.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Left: Eyebrow and portrait image */}
            <div>
              <p className="eyebrow text-ocean">Who we are</p>

              <div className="relative mt-6 aspect-3/4 w-full max-w-md overflow-hidden">
                <img
                  src="/06-find-talent-panel.png"
                  alt="An actor delivering a scene during a casting rehearsal."
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                  width={1254}
                  height={1254}
                  style={{ objectPosition: "55% 50%" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right: Centered title and description */}
            <div className="flex flex-col justify-center lg:py-12">
              <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-7xl">
                People behind the possibilities.
              </h2>

              <div className="mt-8 max-w-2xl space-y-6 text-base leading-relaxed text-ink/65 sm:text-lg">
                <p>
                  Big Fish Collective represents cast and crew and connects them
                  with opportunities across film, streaming, advertising,
                  branded content, and emerging entertainment formats.
                </p>

                <p>
                  Based in Hyderabad, we combine local industry knowledge with
                  an international perspective on where talent can go next. We
                  are building an agency where talent can plan beyond the next
                  project and partners can find the right people without
                  scattered networks, unclear terms, or avoidable delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-360 gap-px bg-white/15 lg:grid-cols-2">
          <article className="relative isolate overflow-hidden bg-ink p-8 sm:p-14 lg:p-20">
            <img
              src="/about-mission-illustration.png"
              alt=""
              aria-hidden="true"
              className="motion-parallax-media absolute -right-16 bottom-0 z-0 h-[112%] w-auto max-w-none opacity-20 mix-blend-screen grayscale"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
            <div className="relative z-10">
              <p className="eyebrow text-seafoam">Mission</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                Connect talent with opportunity and give every career room to
                grow.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                We help talented people become easier to discover, easier to
                understand, and better prepared for opportunities that match
                their strengths.
              </p>
            </div>
          </article>
          <article className="relative isolate overflow-hidden bg-ink p-8 sm:p-14 lg:p-20">
            <img
              src="/about-vision-illustration.png"
              alt=""
              aria-hidden="true"
              className="motion-parallax-media absolute -right-24 bottom-0 z-0 h-[112%] w-auto max-w-none opacity-20 mix-blend-screen grayscale"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
            <div className="relative z-10">
              <p className="eyebrow text-seafoam">Vision</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                Build the most trusted talent ecosystem in Hyderabad and beyond.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                Every serious talent should have a fair chance to be seen, and
                every strong project should be able to find the people it needs.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">What we believe</p>
          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {beliefs.map(([title, text], i) => (
              <article
                key={title}
                className="bg-paper p-7 sm:p-10 viewfinder-hover group relative"
              >
                <span className="inline-block text-xs font-semibold group-hover:font-medium tracking-wider text-ocean transition-transform duration-300 ease-out origin-left group-hover:scale-200">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-ink/60">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="eyebrow text-ocean">Our working style</p>
            <h2 className="section-title mt-5 tracking-[-0.045em] ">
              Serious about the work. Easy to work with.
            </h2>
          </div>
          <ul className="grid gap-0 self-end text-lg">
            {[
              "We move quickly when the project demands it, without skipping important details.",
              "We care about the people behind the profile and the production behind the brief.",
              "We address difficult conversations early and stay accountable.",
              "We keep the process professional without removing the joy from creative work.",
            ].map((x, i) => (
              <li key={x} className="flex gap-6 border-t border-black/15 py-5">
                <span className="text-sm text-ocean">0{i + 1}</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
