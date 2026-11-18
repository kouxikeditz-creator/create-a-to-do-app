import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How do live classes work on Mission Rank Academy?',
      a: 'Live classes are conducted using our high-definition interactive streaming studio. Students can ask doubts in real-time through the live chat, participate in instant polls, and raise their hand to speak with the master educator. If you miss any session, full recordings are available within 30 minutes with synchronized PDF notes.'
    },
    {
      q: 'Is the CBT Test Series identical to the actual NTA JEE and NEET pattern?',
      a: 'Yes, absolutely. Our examination portal is modeled down to the color-coded question palette, section switching rules, question types (single choice, numerical, assertion-reason), and standard marking schemes (+4 for correct, -1 for negative). After submission, you receive an instant detailed scorecard with national percentile, rank projection, and video solutions.'
    },
    {
      q: 'Can I access the course on both mobile and laptop/desktop?',
      a: 'Yes. Mission Rank Academy is fully responsive across smartphones, tablets, iPads, laptops, and desktop computers. Your progress, watched lectures, downloaded notes, and test records sync automatically across all your devices.'
    },
    {
      q: 'How are student doubts resolved outside of live classes?',
      a: 'Students have access to a 24/7 Doubt Resolution Clinic. Simply post your doubt through the doubt portal on your dashboard, and our subject matter experts provide step-by-step explanations or video breakdowns within 15 minutes.'
    },
    {
      q: 'What payment methods are supported for course enrollment?',
      a: 'We support all popular Indian payment modes via Razorpay including UPI (Google Pay, PhonePe, Paytm, BHIM, any UPI ID), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ banks, and easy No-Cost EMI options.'
    },
    {
      q: 'Can I download the study materials and notes for offline study?',
      a: 'Yes! All formula sheets, chapter notes, mind maps, and previous year solved question papers (PYQs) can be read in our interactive online PDF reader or downloaded directly to your device for offline revision.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Everything you need to know about our batches, test series, and mentorship program.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-navy-750 bg-slate-50 dark:bg-navy-850 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-navy-950 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-gold-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-navy-700/60 pt-4">
                    {faq.a}
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
