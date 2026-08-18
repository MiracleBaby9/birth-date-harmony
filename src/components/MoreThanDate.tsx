import { motion } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";
import scheduledDateImg from "@/assets/scheduled-date.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MoreThanDate = () => (
  <section className="py-20 bg-brand-surface">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - decorative element */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-card overflow-hidden shadow-lift border border-brand-rose/20">
            <img
              src={scheduledDateImg}
              alt="Mother gently holding newborn baby's hand surrounded by marigold petals"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-rose/10 via-transparent to-brand-gold/10 pointer-events-none" />
          </div>
        </motion.div>

        {/* Right - text content */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-5"
        >
          <h2 className="heading-lg font-bold">
            More Than Just a Scheduled Date
          </h2>
          <p className="font-accent italic text-brand-gold text-lg">
            Unlock a Thoughtful Beginning
          </p>
          <p className="text-brand-body leading-relaxed">
            The perfect baby name can bring everything back in tune. When a C-section is planned, the birth date becomes more than a medical decision. Numerology helps identify dates that align with harmony, stability, and a strong foundation — supporting your child's natural rhythm from the very beginning.
          </p>

          <div className="rounded-card bg-brand-bg border border-brand-border p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold">
              Confused About Choosing the Right Date?
            </h3>
            <p className="text-brand-body text-sm leading-relaxed">
              With multiple possible dates suggested medically, selecting one can feel overwhelming. Numerology-based guidance helps narrow down suitable options, offering clarity and confidence in your decision.
            </p>
            <a
              href="#pricing"
              className="inline-block rounded-full bg-brand-rose px-6 py-2.5 text-sm font-body font-semibold text-white transition-transform hover:scale-105"
            >
              Get My C-Section Baby Dates Now
            </a>
            <DisclaimerLine />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MoreThanDate;
