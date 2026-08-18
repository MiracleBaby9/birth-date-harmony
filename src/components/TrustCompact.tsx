import { motion } from "framer-motion";
import geita from "@/assets/celeb-geita-tyagi.jpg";
import darshan from "@/assets/celeb-darshan-patil.jpg";
import prashant from "@/assets/celeb-prashant-sambaragi.jpg";

const celebs = [
  { name: "Geita Tyagi", role: "TV & Film Actress", work: "Jagaddhatri · Doli Armaano Ki", image: geita },
  { name: "Prashant S Sambaragi", role: "South Actor & Entrepreneur", work: "Bigg Boss Kannada Season 8", image: prashant },
  { name: "Darshan Patil", role: "Film Actor", work: "Dhurandhar · Thumbs Up", image: darshan },
];

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.3 17.6 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-2.8-.4-4.1H24v8.4h12.6c-.3 2.1-1.6 5.2-4.6 7.3l7.6 5.9c4.5-4.2 6.5-10.2 6.5-17.5z" />
    <path fill="#FBBC05" d="M10.4 28.7A14.4 14.4 0 019.6 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 000 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.6-5.8l-7.6-5.9c-2 1.4-4.7 2.4-8 2.4-6.4 0-11.7-3.8-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

const TrustCompact = () => (
  <section className="py-14">
    <div className="container max-w-2xl space-y-4">
      <div className="text-center space-y-1.5 mb-8">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-gold">Trusted Across India</p>
        <h2 className="heading-md font-bold">
          Celebrities, Press &amp; <span className="text-brand-gold">14000+</span> Happy Families
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-card bg-brand-card border border-brand-border p-6 text-center shadow-soft"
      >
        <div className="flex items-center justify-center gap-2">
          <GoogleG />
          <span className="font-body text-base font-semibold text-brand-heading">Google Reviews</span>
        </div>
        <div className="mt-2 text-brand-gold tracking-[0.2em]" aria-hidden>★★★★★</div>
        <div className="font-display text-4xl font-bold text-brand-gold leading-none mt-1">4.9★</div>
        <p className="text-sm text-brand-muted mt-1.5">14000+ Families Served</p>
      </motion.div>

      {celebs.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-4 rounded-card bg-brand-card border border-brand-border p-4 shadow-soft"
        >
          <img
            src={c.image}
            alt={`${c.name} — ${c.role}`}
            loading="lazy"
            className="h-16 w-16 flex-shrink-0 rounded-xl object-cover object-top"
          />
          <div className="min-w-0 space-y-1">
            <span className="inline-block rounded-full bg-brand-gold/90 px-2.5 py-0.5 text-[9px] font-body font-semibold uppercase tracking-[0.14em] text-white">
              Celebrity Client
            </span>
            <h3 className="font-display text-lg font-bold text-brand-heading leading-tight">{c.name}</h3>
            <p className="font-body text-sm text-brand-gold">{c.role}</p>
            <p className="font-body text-xs text-brand-muted">{c.work}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TrustCompact;
