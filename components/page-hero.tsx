import { SiteHeader } from "@/components/site-header";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <>
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-black bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-16 text-[clamp(12rem,28vw,30rem)] font-bold leading-none tracking-widest text-black/[0.035]"
        >
          BFC
        </div>
        <div className="relative mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.65fr] lg:px-12 lg:py-32">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-title mt-5 max-w-4xl">{title}</h1>
          </div>
          <div className="flex items-end border-l border-black pl-6 lg:pl-10">
            <p className="max-w-xl text-lg leading-relaxed text-black/65 sm:text-xl">
              {intro}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
