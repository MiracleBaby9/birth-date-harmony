import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const testimonials = [
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    text: "Himansshu Ji guided us with 3 perfect dates for our baby's C-section. We felt so confident and at peace with the decision. Truly grateful!",
  },
  {
    name: "Ankit & Neha R.",
    location: "Delhi",
    rating: 5,
    text: "We were confused between so many dates. The detailed analysis made it crystal clear. Our baby was born on the most auspicious date possible!",
  },
  {
    name: "Kavitha M.",
    location: "Bangalore",
    rating: 5,
    text: "The Premium package was worth every rupee. The 150+ page report and 10-year predictions gave us incredible insight. Highly recommended!",
  },
  {
    name: "Rohit & Simran K.",
    location: "Jaipur",
    rating: 5,
    text: "WhatsApp support was outstanding. Every question was answered patiently. The name report was a beautiful bonus. Thank you, Himansshu Ji!",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-brand-gold">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-sm">⭐</span>
    ))}
  </div>
);

const Testimonials = () => (
  <section className="py-20 bg-brand-surface">
    <div className="container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        custom={0}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-2"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          What Parents Are Saying
        </h2>
        <p className="font-accent italic text-brand-gold text-lg">
          Real experiences from real families
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={i}
            viewport={{ once: true }}
            className="rounded-card bg-brand-card border border-brand-border p-6 space-y-3 relative"
          >
            {/* Quote mark */}
            <span className="absolute top-4 right-5 font-accent text-5xl text-brand-rose/10 leading-none select-none">
              "
            </span>

            <Stars count={t.rating} />

            <p className="text-brand-body text-sm leading-relaxed italic">
              "{t.text}"
            </p>

            <div className="pt-2 border-t border-brand-border">
              <span className="font-body font-semibold text-brand-heading text-sm">
                {t.name}
              </span>
              <span className="text-brand-muted text-xs ml-2">{t.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
