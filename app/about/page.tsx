import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";

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
      <PageHero
        eyebrow="About Big Fish"
        title="A talent agency built around people, not transactions."
        intro="We believe representation should create direction, not dependency. Our role is to understand people deeply, open the right doors, and make every working relationship clearer."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.6fr_1fr] lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">Who we are</p>
          <div className="space-y-6 text-lg leading-relaxed text-ink/65">
            <p>
              Big Fish Collective represents cast and crew and connects them
              with opportunities across film, streaming, advertising, branded
              content, and emerging entertainment formats.
            </p>
            <p>
              Based in Hyderabad, we combine local industry knowledge with an
              international perspective on where talent can go next. We are
              building an agency where talent can plan beyond the next project
              and partners can find the right people without scattered networks,
              unclear terms, or avoidable delays.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-360 gap-px bg-white/15 lg:grid-cols-2">
          <article className="bg-ink p-8 sm:p-14 lg:p-20">
            <p className="eyebrow text-seafoam">Mission</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
              Connect talent with opportunity and give every career room to
              grow.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              We help talented people become easier to discover, easier to
              understand, and better prepared for opportunities that match their
              strengths.
            </p>
          </article>
          <article className="bg-ink p-8 sm:p-14 lg:p-20">
            <p className="eyebrow text-seafoam">Vision</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
              Build the most trusted talent ecosystem in Hyderabad and beyond.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Every serious talent should have a fair chance to be seen, and
              every strong project should be able to find the people it needs.
            </p>
          </article>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">What we believe</p>
          <div className="mt-10 grid gap-px bg-black/15 sm:grid-cols-2">
            {beliefs.map(([title, text], i) => (
              <article key={title} className="bg-paper p-7 sm:p-10">
                <span className="text-xs text-ocean">0{i + 1}</span>
                <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
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
            <h2 className="section-title mt-5">
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
