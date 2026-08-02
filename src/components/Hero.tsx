import { motion, type Variants } from "framer-motion";
import { Star, Baby, Sparkles, ShieldCheck } from "lucide-react";
import DisclaimerLine from "./DisclaimerLine";
import heroBg from "@/assets/hero-bg.jpg";

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

const trustItems = [
  { Icon: Star, bold: "4.9 Star", sub: "User Rating", color: "text-brand-gold" },
  { Icon: Baby, bold: "Thousands", sub: "Happy Parents", color: "text-brand-rose" },
  { Icon: Sparkles, bold: "99%+", sub: "Felt Confident", color: "text-brand-sage" },
  { Icon: ShieldCheck, bold: "100%", sub: "Reliable Results", color: "text-brand-rose" },
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
        className="w-full h-full object-cover"
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
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-brand-heading"
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
        When a C-section is planned, the birth date becomes more than a medical decision. Numerology helps identify dates that align with harmony, stability, and a strong foundation — supporting your child's natural rhythm from the very beginning.
      </motion.p>

      <motion.a
        href="#pricing"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="inline-block rounded-full bg-gradient-warm px-9 py-4 text-base font-body font-bold text-white shadow-soft transition-transform hover:scale-[1.04]"
      >
        Get My C-Section Baby Dates Now
      </motion.a>

      {/* Trust badges - aesthetic cards */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={4}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-xl mx-auto"
      >
        {trustItems.map((t, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5 glass-card rounded-2xl px-3 py-4 shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <t.Icon className={`h-6 w-6 ${t.color}`} strokeWidth={1.75} />
            <span className="font-body font-bold text-brand-heading text-sm leading-tight">{t.bold}</span>
            <span className="text-[10px] text-brand-muted leading-tight">{t.sub}</span>
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

