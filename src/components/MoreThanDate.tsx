import { motion } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55 },
  }),
};

const pillars = [
  {
    title: "Astrology",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12 2l1.9 5.9H20l-4.9 3.6 1.9 5.9L12 13.8 7 17.4l1.9-5.9L4 7.9h6.1L12 2z" />
      </svg>
    ),
    text: "Panchang, Tithi, Nakshatra and Mool checks reveal how the planetary sky of each date supports your baby's temperament and life path.",
  },
  {
    title: "Numerology",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M5 4h9l-1.5 3H9.5l-1 3.2h2.3A4.6 4.6 0 0115 15c0 3-2.4 5-5.6 5-2 0-3.7-.7-4.9-1.9l2-2.3c.8.8 1.7 1.2 2.8 1.2 1.4 0 2.3-.7 2.3-1.8 0-1.1-.9-1.8-2.4-1.8H6.3L8.7 7H5V4z" />
      </svg>
    ),
    text: "Mulank, Bhagyank, Loshu Grid and compound numbers are mapped to shortlist dates that stay in harmony with the family's own vibration.",
  },
  {
    title: "Shubh Muhurat",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5.3l4 2.4-1 1.7-5-3V7h2z" />
      </svg>
    ),
    text: "Within your medically approved window we identify the most auspicious time bands — so the chosen slot feels calm, stable and well-timed.",
  },
];

const MoreThanDate = () => (
  <section className="py-16 sm:py-20">
    <div className="container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-card bg-brand-panel border border-brand-panel-border p-7 sm:p-12 lg:p-16"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-body text-[0.7rem] sm:text-xs uppercase tracking-[0.3em] text-brand-gold">
            The Philosophy
          </p>
          <h2 className="heading-lg font-bold text-white">
            More Than Just a{" "}
            <span className="text-brand-gold">Scheduled Date</span>
          </h2>
          <p className="text-white/70 leading-relaxed">
            When a C-section is planned, the birth date becomes more than a medical decision.
            Astrology and Numerology help identify dates that align with harmony, stability and a
            strong foundation — supporting your child's natural rhythm from the very beginning.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              viewport={{ once: true }}
              className="rounded-card border border-brand-panel-border bg-white/[0.04] p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                {p.icon}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto rounded-card border border-brand-panel-border bg-white/[0.04] p-6 text-center space-y-3">
          <h3 className="font-display text-lg font-semibold text-white">
            Confused About Choosing the Right Date?
          </h3>
          <p className="text-sm leading-relaxed text-white/65">
            With multiple possible dates suggested medically, selecting one can feel overwhelming.
            Astrology and numerology-based guidance narrows the options down to the top auspicious
            choices — bringing clarity and confidence to your decision.
          </p>
          <a
            href="/#pricing"
            className="inline-block rounded-full bg-gradient-warm px-7 py-3 text-sm font-body font-semibold text-white transition-transform hover:scale-105"
          >
            Get My Planned Delivery Dates Now
          </a>
          <DisclaimerLine />
        </div>
      </motion.div>
    </div>
  </section>
);

export default MoreThanDate;
