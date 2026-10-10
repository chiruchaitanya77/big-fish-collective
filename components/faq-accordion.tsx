"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-black/15">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`} className="border-black/15">
          <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline sm:text-xl">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-7 text-base leading-relaxed text-ink/65">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
