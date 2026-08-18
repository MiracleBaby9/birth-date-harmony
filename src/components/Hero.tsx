import { motion, type Variants } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";
import heroBg from "@/assets/hero-bg.webp";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const featureLine = [
  "Panchang, Tithi, Mool, Nakshatra",
  "Delivered within 24–48 Hours",
  "Loshu Grid, Rajyog, Mulank, Bhagyank Analysis",
];

const stats = [
  { value: "14,000+", label: "Reports" },
  { value: "4.9/5", label: "Rating" },
  { value: "99%", label: "Satisfaction" },
];


const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 sm:pt-28">
    {/* Background image with opacity */}
    <div className="absolute inset-0 z-0">
      <img
        src={heroBg}
        alt="Mystical birth date selection background"
        width={1920}
        height={1080}
        className="w-full h-full object-cover object-[62%_18%] sm:object-center"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-brand-bg/80" />
    </div>


    {/* Radial glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-rose/15 blur-[130px] pointer-events-none z-[1]" />

    <div className="container relative z-10 text-center max-w-3xl space-y-6">
      <motion.span
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="inline-block rounded-full border border-brand-rose/30 bg-white/70 backdrop-blur-md px-5 py-1.5 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.18em] text-brand-rose shadow-soft"
      >
        If You Are Planning a C-Section
      </motion.span>

      <motion.h1
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="heading-xl font-bold leading-tight text-brand-heading"
      >
        Let Me Choose the Most Powerful Birth Date for Your Child
      </motion.h1>

      <motion.p
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="text-brand-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
      >
        Astrology &amp; Numerology helps identify dates that align with harmony, stability, and a strong foundation — supporting your child's natural rhythm from the very beginning.
      </motion.p>

      <motion.a
        href="/#pricing"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="inline-block whitespace-nowrap rounded-full bg-gradient-warm px-6 sm:px-9 py-3.5 sm:py-4 text-[0.82rem] sm:text-base font-body font-bold text-white shadow-soft transition-transform hover:scale-[1.04]"
      >
        Get My C-Section Baby Dates Now
      </motion.a>


      {/* Assurance pill */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={4}
        className="flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 bg-white/70 backdrop-blur-md px-6 py-2.5 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.16em] text-brand-gold shadow-soft">
          <span aria-hidden>★</span> Top 3 Auspicious Dates <span aria-hidden>★</span>
        </span>
      </motion.div>

      {/* Feature line */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={5}
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-brand-muted"
      >
        {featureLine.map((f) => (
          <span key={f} className="inline-flex items-center gap-1.5">
            <span className="text-brand-gold" aria-hidden>✦</span>
            {f}
          </span>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={6}
        className="mx-auto max-w-2xl border-y border-brand-gold/40 py-6 grid grid-cols-3 divide-x divide-brand-gold/30"
      >
        {stats.map((s) => (
          <div key={s.label} className="px-2">
            <div className="font-display text-2xl sm:text-4xl font-bold text-brand-gold">{s.value}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-brand-muted mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>


      <motion.div 
        variants={fadeUpVariants}
        initial="hidden" 
        animate="visible" 
        custom={5}
      >
        <DisclaimerLine />
      </motion.div>
    </div>
  </section>
);

export default Hero;

