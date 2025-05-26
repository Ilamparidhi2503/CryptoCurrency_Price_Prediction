import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion variant="bordered" selectionMode="multiple">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} title={faq.question}>
          <div className="text-default-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}