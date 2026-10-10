import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about representation, project briefs, fees, contracts, commissions, timelines, cancellations, and working with Big Fish Collective.",
};
const talent = [
  {
    question: "Does applying guarantee representation?",
    answer:
      "No. We review every complete application, but representation depends on fit, readiness, current demand, and our ability to support your category properly.",
  },
  {
    question: "Do you guarantee work?",
    answer:
      "No responsible agency can guarantee work. We can improve visibility, introduce relevant opportunities, prepare you for decisions, and negotiate professionally when an opportunity progresses.",
  },
  {
    question: "How does commission work?",
    answer:
      "Commission is agreed before representation begins and may vary by service, category, market, and project type. The percentage and payment process are stated clearly in the representation agreement.",
  },
  {
    question: "Can I decline an opportunity?",
    answer:
      "Yes. We present the available information and discuss how the opportunity fits your goals. The final decision remains yours, subject to any commitment already accepted in writing.",
  },
  {
    question: "Will you help with negotiations and contracts?",
    answer:
      "Yes. Your account manager coordinates the commercial conversation and confirms the main terms before the detailed agreement is prepared.",
  },
];
const partners = [
  {
    question: "Who negotiates the fee?",
    answer:
      "A dedicated account manager handles the negotiation. We consider the brief, market context, talent value, schedule, usage, deliverables, and budget before terms are confirmed.",
  },
  {
    question: "How quickly can you send a shortlist?",
    answer:
      "Timing depends on the role, category, dates, and level of search required. A complete brief allows us to respond faster, and we confirm a realistic timeline after reviewing it.",
  },
  {
    question: "Can you source both cast and crew?",
    answer:
      "Yes, where the required disciplines fall within our active network. For specialist roles outside that network, we will say so early rather than send weak options.",
  },
  {
    question: "What happens if someone becomes unavailable?",
    answer:
      "We confirm the change, return to the original brief, and present the strongest available replacement options. Where possible, we identify backups before the final decision.",
  },
  {
    question: "How are contracts handled?",
    answer:
      "We first align the main commercial and working terms in a clear summary. The detailed contract then records scope, dates, fee, payment terms, usage, deliverables, cancellation terms, and other conditions.",
  },
];
export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="Questions, answered"
        title="Clear expectations make better partnerships."
        intro="Practical answers for talent and creative partners before an application, brief, or project moves forward."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="eyebrow text-ocean">For talent</p>
            <h2 className="mt-5 font-serif text-4xl">Representation</h2>
          </div>
          <FaqAccordion items={talent} />
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="eyebrow text-ocean">For partners</p>
            <h2 className="mt-5 font-serif text-4xl">Projects and hiring</h2>
          </div>
          <FaqAccordion items={partners} />
        </div>
      </section>
      <CtaBand
        title="Still have a question"
        copy="Send it to our team and we will route it to the right person."
      />
      <SiteFooter />
    </main>
  );
}
