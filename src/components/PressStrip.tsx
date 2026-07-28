import { motion } from "framer-motion";

const press = [
  { name: "Hindustan", tag: "Featured" },
  { name: "DailyHunt", tag: "Featured" },
  { name: "Inc91", tag: "Featured" },
  { name: "Hindustan Bytes", tag: "Featured" },
];

const PressStrip = () => (
  <section className="py-10 border-y border-brand-border/60 bg-brand-surface/40">
    <div className="container">
      <p className="text-center font-body text-xs uppercase tracking-[0.25em] text-brand-muted mb-5">
        As Featured In
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {press.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="font-display text-base sm:text-lg font-semibold text-brand-heading/70 hover:text-brand-rose transition-colors"
          >
            {p.name}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PressStrip;
