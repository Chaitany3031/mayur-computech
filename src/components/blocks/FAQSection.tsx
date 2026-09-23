import React, { useState } from 'react';
import { FAQS_DATA } from '../../data/instituteData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Clear answers about certification validity, flexible batch timings, lab practice, and fee installment plans.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900 transition-colors"
                >
                  <span className="text-sm font-bold text-white pr-2">{faq.question}</span>
                  <span className="text-amber-400 text-lg font-mono shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
