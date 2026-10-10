import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { EnquiryForms } from "@/components/enquiry-forms";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Submit a project brief, apply for representation, or contact Big Fish Collective in Hyderabad.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start with the right conversation."
        intro="Choose the form that fits your enquiry. Your details go directly to the team responsible for talent representation or project staffing."
      />
      <EnquiryForms />
      <section className="border-t border-white/20 bg-black text-white">
        <div className="mx-auto grid max-w-[1180px] gap-px bg-white/20 md:grid-cols-2">
          <a href="mailto:hello@bigfishcollective.in" className="group flex min-h-44 items-center gap-5 bg-black px-6 py-10 sm:px-10">
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/30"><Mail className="size-5" /></span>
            <span>
              <span className="eyebrow block text-white/45">Direct email</span>
              <span className="mt-2 block text-lg font-semibold group-hover:underline">hello@bigfishcollective.in</span>
            </span>
          </a>
          <div className="flex min-h-44 items-center gap-5 bg-black px-6 py-10 sm:px-10">
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/30"><MapPin className="size-5" /></span>
            <span>
              <span className="eyebrow block text-white/45">Based in</span>
              <span className="mt-2 block text-lg font-semibold">Hyderabad, India</span>
            </span>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
