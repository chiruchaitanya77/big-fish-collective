import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "Ready to make the right connection",
  copy = "Whether you are building a career or assembling a team, start with a conversation.",
  primaryLabel = "Submit a Brief",
  primaryHref = "/contact#project-brief",
  secondaryLabel = "Join the Collective",
  secondaryHref = "/contact#talent-application",
}: {
  title?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-ocean text-white">
      <div className="mx-auto grid max-w-360 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20">
        <div>
          <p className="eyebrow text-white/55">Start here</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{copy}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-white px-6 text-ink hover:bg-white/85"
          >
            <Link href={primaryHref}>
              {primaryLabel} <ArrowUpRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-none border-white/40! bg-transparent px-6 text-white hover:bg-white! hover:text-ink"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
