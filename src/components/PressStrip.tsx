import { motion } from "framer-motion";

const Inc91 = () => (
  <div className="flex items-baseline font-body text-lg sm:text-xl font-extrabold tracking-tight text-brand-heading">
    INC
    <span className="ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-rose text-[0.7rem] font-bold text-white">
      9
    </span>
    <span className="text-brand-heading">1</span>
  </div>
);

const DailyHunt = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <circle cx="11" cy="11" r="6" fill="hsl(var(--brand-rose))" opacity="0.85" />
      <circle cx="21" cy="11" r="6" fill="hsl(var(--brand-gold))" opacity="0.85" />
      <circle cx="11" cy="21" r="6" fill="hsl(var(--brand-sage))" opacity="0.85" />
      <circle cx="21" cy="21" r="6" fill="hsl(var(--brand-heading))" opacity="0.6" />
    </svg>
    <span className="font-body text-base sm:text-lg font-semibold text-brand-heading">dailyhunt</span>
  </div>
);

const HindustanBytes = () => (
  <div className="flex flex-col leading-none">
    <span className="font-display text-base sm:text-lg font-semibold text-brand-heading">हिंदुस्तान</span>
    <span className="font-body text-[0.6rem] tracking-[0.3em] text-brand-muted uppercase">Bytes</span>
  </div>
);

const UnseenTimes = () => (
  <div className="flex flex-col items-center gap-0.5 leading-none">
    <span className="rounded-sm bg-brand-rose/90 px-1.5 py-0.5 font-body text-[0.65rem] font-bold uppercase tracking-widest text-white">
      Unseen
    </span>
    <span className="rounded-sm bg-brand-heading/85 px-1.5 py-0.5 font-body text-[0.65rem] font-bold uppercase tracking-widest text-white">
      Times
    </span>
  </div>
);

const press = [
  { name: "Inc91", Logo: Inc91 },
  { name: "DailyHunt", Logo: DailyHunt },
  { name: "Hindustan Bytes", Logo: HindustanBytes },
  { name: "Unseen Times", Logo: UnseenTimes },
];

const PressStrip = () => (
  <section className="py-10 border-y border-brand-border/60 bg-brand-surface/40">
    <div className="container">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-muted">As Featured In</p>
        {press.map(({ name, Logo }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            aria-label={name}
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <Logo />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PressStrip;
