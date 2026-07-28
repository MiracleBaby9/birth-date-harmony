import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cards = [
  {
    icon: "🔢",
    iconBg: "bg-brand-sage/20",
    heading: "Confused Between 1, 10, 19, 28?",
    gold: "Because All are Mulank 1",
    pill: "Choose a beginning that supports balance and strength",
    body: "With multiple possible dates suggested medically, selecting one can feel overwhelming. Numerology-based guidance helps narrow down suitable options, offering clarity and confidence in your decision.",
  },
  {
    icon: "🔗",
    iconBg: "bg-brand-rose/20",
    heading: "Concerned About Date Compatibility?",
    body: "Unsure whether a chosen date aligns well with numerological principles? This guidance evaluates potential imbalances and suggests dates that support emotional balance, confidence, and long-term stability.",
  },
  {
    icon: "🌱",
    iconBg: "bg-brand-gold/20",
    heading: "Planning a Conscious Beginning?",
    body: "If you want to plan your child's birth thoughtfully, numerology offers insight into dates that complement overall alignment — helping parents feel assured about the start of a new life journey.",
  },
];

const WhoShouldConsider = () => (
  <section className="py-20">
    <div className="container">
      <motion.h2
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-display text-2xl sm:text-3xl font-bold text-center mb-12"
      >
        Who Should Consider C-Section Baby Date Guidance?
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-card bg-brand-card border border-brand-border p-6 relative overflow-hidden"
          >
            {/* Top rose accent strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-rose/40" />
            <div className={`w-12 h-12 rounded-full ${c.iconBg} flex items-center justify-center text-2xl mb-4`}>
              {c.icon}
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{c.heading}</h3>
            {c.gold && (
              <p className="font-accent italic text-brand-gold text-sm mb-2">{c.gold}</p>
            )}
            {c.pill && (
              <span className="inline-block rounded-full bg-brand-surface text-brand-rose text-xs font-body px-3 py-1 mb-3">
                {c.pill}
              </span>
            )}
            <p className="text-brand-body text-sm leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoShouldConsider;
