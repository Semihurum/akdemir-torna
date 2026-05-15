"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="sss" className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4 sm:px-5 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-2 sm:mb-3 block">
            Merak Edilenler
          </span>
          <h2 className="text-[26px] sm:text-3xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 text-on-surface">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-secondary opacity-70 text-[13px] sm:text-[14px] md:text-[15px]">
            Aklınıza takılan temel konulara cevaplar
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-sm"
            >
              <button
                id={`faq-toggle-${index}`}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h4 className="font-bold text-[14px] sm:text-[15px] text-on-surface pr-2">
                  {faq.question}
                </h4>
                <span
                  className={`material-symbols-outlined text-[20px] sm:text-[24px] text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-[500px] opacity-100 pb-4 sm:pb-5" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[13px] sm:text-[14px] text-secondary leading-[1.6] px-4 sm:px-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
