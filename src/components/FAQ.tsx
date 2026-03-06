'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 mb-3">
          <span className="block w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full" />
          よくある質問
          <span className="block w-6 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">FAQ</h2>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              aria-expanded={open === i}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 text-xs font-black flex items-center justify-center mt-0.5">
                  Q
                </span>
                <span className="font-semibold text-gray-900 text-sm leading-relaxed">
                  {item.question}
                </span>
              </div>
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all duration-200 ${
                  open === i ? 'bg-indigo-600 border-indigo-600 rotate-45' : 'bg-white'
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-colors ${open === i ? 'text-white' : 'text-gray-400'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>

            {open === i && (
              <div className="px-6 pb-5">
                <div className="border-t border-gray-50 pt-4 flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 text-xs font-black flex items-center justify-center mt-0.5">
                    A
                  </span>
                  <p className="text-sm text-gray-600 leading-7">{item.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}