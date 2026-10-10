import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Creative Talent in Hyderabad",
  description:
    "Connect with actors, creators, technicians, and production professionals in Hyderabad and worldwide.",
};

export default function HyderabadPage() {
  const reasons = [
    [
      "A growing screen ecosystem",
      "Film, streaming, advertising, branded content, and independent production create a broad mix of opportunities and skills.",
    ],
    [
      "Creative and technical depth",
      "The city brings together performers, storytellers, technicians, production professionals, and technology talent.",
    ],
    [
      "Production flexibility",
      "A wide range of locations, vendors, languages, and crew experience supports different scales and formats of work.",
    ],
    [
      "Strong connections",
      "Hyderabad is well placed to connect local creative expertise with international markets, productions, and partners.",
    ],
  ];
  return (
    <main>
      <PageHero
        eyebrow="Hyderabad and beyond"
        title="Built in Hyderabad. Connected to the wider industry."
        intro="Hyderabad combines established production experience with a new generation of filmmakers, performers, technicians, and creators. Big Fish Collective gives partners a direct route into that network."
      />
      <section className="relative min-h-[600px] bg-deep-ocean text-white">
        <img
          src="/08-hyderabad-location-panorama.png"
          alt="A film crew preparing a camera in a historic-style stone courtyard."
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1942}
          height={809}
          style={{ objectPosition: "75% 50%", opacity: 1 }}
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep-ocean via-deep-ocean/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[600px] max-w-360 items-end px-5 py-16 sm:px-8 lg:px-12">
          <p className="max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
            Local knowledge makes strong regional talent easier to discover,
            assess, and engage.
          </p>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow text-ocean">Why Hyderabad</p>
          <div className="mt-10 grid gap-px bg-black/15 sm:grid-cols-2">
            {reasons.map(([t, d], i) => (
              <article key={t} className="bg-paper p-7 sm:p-10">
                <span className="text-xs text-ocean">0{i + 1}</span>
                <h2 className="mt-8 text-2xl font-semibold">{t}</h2>
                <p className="mt-4 leading-relaxed text-ink/60">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-360 gap-px bg-black/15 lg:grid-cols-2">
          <article className="bg-white p-8 sm:p-14 lg:p-20">
            <p className="eyebrow text-ocean">For partners outside Hyderabad</p>
            <h2 className="mt-5 font-serif text-4xl">
              One accountable point of contact.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/60">
              You do not need to know the local network before starting. We
              coordinate discovery, availability, introductions, and commercial
              conversations.
            </p>
          </article>
          <article className="bg-white p-8 sm:p-14 lg:p-20">
            <p className="eyebrow text-ocean">For Hyderabad talent</p>
            <h2 className="mt-5 font-serif text-4xl">
              Let the right work travel further.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/60">
              Clear profiles, reliable information, and thoughtful
              representation can help strong local talent become visible beyond
              familiar circles.
            </p>
          </article>
        </div>
      </section>
      <CtaBand
        title="Build your team in Hyderabad"
        copy="Tell us what your production needs and we will connect you with the right local talent."
      />
      <SiteFooter />
    </main>
  );
}
