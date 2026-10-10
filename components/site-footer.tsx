import { AnalyticsSettings } from "@/components/site-analytics";
import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  ["About", "/about"], ["For Talent", "/talent"], ["For Partners", "/partners"], ["Find Talent", "/find-talent"],
  ["Services", "/services"], ["How We Work", "/process"], ["Hyderabad", "/hyderabad"],
  ["FAQ", "/faq"], ["Contact", "/contact"],
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandMark inverse large />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/65">
              A Hyderabad-based talent agency representing cast and crew and connecting creative partners with the people their projects need.
            </p>
          </div>
          <div>
            <p className="eyebrow text-white/45">Navigate</p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {footerLinks.map(([label, href]) => <Link key={href} href={href} className="text-sm text-white/70 hover:text-white">{label}</Link>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-white/45">Let&apos;s talk</p>
            <a href="mailto:hello@bigfishcollective.in" className="mt-5 inline-flex items-center gap-2 text-lg font-medium hover:text-seafoam">
              hello@bigfishcollective.in <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-3 text-sm text-white/55">Hyderabad, India</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs tracking-wide text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Big Fish Collective</p><AnalyticsSettings />
          <p>The ocean is big. The right collective makes it easier to move.</p>
        </div>
      </div>
    </footer>
  );
}
