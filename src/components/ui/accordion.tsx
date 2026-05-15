"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="text-sm font-medium text-foreground">{item.title}</span>
            <ChevronDown
              size={16}
              className={`text-muted transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === i ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
