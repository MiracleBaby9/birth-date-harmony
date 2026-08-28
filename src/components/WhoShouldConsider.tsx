import { motion } from "framer-motion";
import { CalendarCheck, Link2, Sprout } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cards = [
  {
    Icon: CalendarCheck,
    heading: "Overwhelmed by Multiple Dates",
    body: "With multiple possible dates suggested medically, selecting one can feel overwhelming. Numerology-based guidance helps narrow down suitable options, offering clarity and confidence in your decision.",
  },
  {
    Icon: Link2,
    heading: "Worried About Date Compatibility",
    body: "Unsure whether a chosen date aligns well with numerological principles? This guidance evaluates potential imbalances and suggests dates that support emotional balance, confidence, and long-term stability.",
  },
  {
    Icon: Sprout,
    heading: "Planning a Conscious Beginning",
    body: "If you want to plan your child's birth thoughtfully, numerology offers insight into dates that complement overall alignment — helping parents feel assured about the start of a new life journey.",
  },
];

const WhoShouldConsider = () => (
  <section className="py-14">
    <div className="container">
      <div className="rounded-[2rem] bg-brand-panel border border-brand-panel-border px-6 py-16 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-gold">
            The Challenge
          </p>
          <h2 className="heading-lg font-bold text-white leading-tight">
            Struggling to Choose the{" "}
            <span className="text-brand-gold">Right Planned Delivery Date?</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            You're not alone. Most parents feel this way — a birth date isn't
            just a formality. It's the first energy your child carries.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {cards.map(({ Icon, heading, body }, i) => (
            <motion.div
              key={heading}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-3xl bg-white/[0.04] border border-white/10 p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-gold mb-5">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {heading}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhoShouldConsider;
