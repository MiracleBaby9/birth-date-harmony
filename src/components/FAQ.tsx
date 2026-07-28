import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";

const faqs = [
  { q: "What is C-Section baby date selection?", a: "C-Section baby date selection is a numerology-based guidance process that helps parents choose a supportive birth date when a planned medical delivery is already decided." },
  { q: "Does this replace medical advice or my doctor's recommendation?", a: "No. Medical safety always comes first. Numerology guidance is provided only within the medically approved date range suggested by your doctor." },
  { q: "How are the dates selected?", a: "Dates are evaluated using numerology principles, considering factors like day vibration and overall numerical balance to support harmony, confidence, and stability for the child." },
  { q: "How many date options will I receive?", a: "You will typically receive 2–3 carefully evaluated date options, from which you can choose in coordination with your doctor." },
  { q: "Is this service only for numerology believers?", a: "Not at all. The guidance is shared in simple, practical language, helping parents make an informed and thoughtful decision without requiring prior numerology knowledge." },
  { q: "What details are required from parents?", a: "You will be asked for the expected delivery window, medical constraints (if any), and basic parental details required for numerology evaluation." },
  { q: "Can this be done at the last minute?", a: "Yes, urgent requests can be handled depending on availability. However, early planning allows for better evaluation and flexibility." },
  { q: "Will choosing a date guarantee a specific outcome for my child?", a: "No. Date selection is a supportive alignment tool, not a guarantee. A child's growth is shaped by upbringing, environment, and care along with timing." },
  { q: "How will I receive the suggested dates?", a: "The guidance is shared through a personalised report or message, delivered digitally via WhatsApp or email." },
  { q: "Is my personal information kept confidential?", a: "Absolutely. All details shared for C-Section date guidance are strictly confidential and used only for this consultation." },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-card bg-brand-card border border-brand-border overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
      >
        <span className="font-display font-semibold text-sm text-brand-heading">{q}</span>
        <svg
          className={`w-5 h-5 text-brand-rose transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-brand-body leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const left = faqs.slice(0, 5);
  const right = faqs.slice(5);

  return (
    <section className="py-20 bg-brand-surface">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl font-bold text-center mb-12"
        >
          Frequently Asked Questions (FAQs)
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {left.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
          <div className="space-y-4">
            {right.map((f, i) => <FAQItem key={i + 5} q={f.q} a={f.a} index={i + 5} />)}
          </div>
        </div>

        <div className="mt-8">
          <DisclaimerLine />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
