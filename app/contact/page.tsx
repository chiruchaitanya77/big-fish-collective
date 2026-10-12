import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { EnquiryForms } from "@/components/enquiry-forms";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Submit a project brief, apply for representation, or contact Big Fish Collective in Hyderabad.",
};

export default function ContactPage() {
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

        <div className="relative mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.65fr] lg:px-12 lg:py-24">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display-title mt-5 max-w-4xl">
              Start with the right conversation.
            </h1>
          </div>

          <div className="flex flex-col justify-end border-l border-black pl-6 lg:pl-10">
            <img
              src="/contact.png"
              alt=""
              aria-hidden="true"
              className="motion-inline-illustration motion-parallax-media mb-8 w-full max-w-md scale-125"
              width={520}
              height={340}
              loading="lazy"
              decoding="async"
            />

            <p className="max-w-xl text-lg leading-relaxed text-black/65 sm:text-xl">
              Choose the form that fits your enquiry. Your details go directly
              to the team responsible for talent representation or project
              staffing.
            </p>
          </div>
        </div>
      </section>

      <EnquiryForms />
      <section className="border-t border-white/20 bg-black text-white">
        <div className="mx-auto grid max-w-295 gap-px bg-white/20 md:grid-cols-2">
          <a
            href="mailto:hello@bigfishcollective.in"
            className="group flex min-h-44 items-center gap-5 bg-black px-6 py-10 sm:px-10"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/30">
              <Mail className="size-5" />
            </span>
            <span>
              <span className="eyebrow block text-white/45">Direct email</span>
              <span className="mt-2 block text-lg font-semibold group-hover:underline">
                hello@bigfishcollective.in
              </span>
            </span>
          </a>
          <div className="flex min-h-44 items-center gap-5 bg-black px-6 py-10 sm:px-10">
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/30">
              <MapPin className="size-5" />
            </span>
            <span>
              <span className="eyebrow block text-white/45">Based in</span>
              <span className="mt-2 block text-lg font-semibold">
                Hyderabad, India
              </span>
            </span>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
