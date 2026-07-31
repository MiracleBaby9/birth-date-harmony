import { motion } from "framer-motion";

const features = [
  { label: "Top 3 Auspicious Dates", e: true, c: true },
  { label: "Panchang, Tithi, Mool & Nakshatra Analysis", e: true, c: true },
  { label: "Numerologically Powerful Dates", e: true, c: true },
  { label: "Mulank, Bhagyank & Rajyog Analysis", e: true, c: true },
  { label: "Shubh Muhurat Timings", e: true, c: true },
  { label: "Swar / Alphabet Suggestion", e: false, c: true },
  { label: "Perfect Baby Name Report (50+ Pages)", e: false, c: true },
  { label: "Lucky Colors & Numbers", e: false, c: true },
  { label: "WhatsApp Support", e: "15 Days", c: "21 Days" },
];

const Cell = ({ v }: { v: boolean | string }) => {
  if (typeof v === "string") return <span className="font-body text-sm text-brand-body">{v}</span>;
  return v ? (
    <span className="text-brand-sage text-lg">✓</span>
  ) : (
    <span className="text-brand-muted/50 text-lg">—</span>
  );
};

const ComparePackages = () => (
  <section className="py-12 scroll-mt-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 space-y-2"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold">Compare Packages</h2>
        <p className="font-accent italic text-brand-gold">Find the right fit for your family at a glance</p>
      </motion.div>

      <div className="overflow-x-auto rounded-card border border-brand-border bg-brand-card shadow-sm">
        <table className="w-full min-w-[420px] text-left">
          <thead>
            <tr className="border-b border-brand-border bg-brand-surface/60">
              <th className="px-4 py-4 font-display text-sm sm:text-base font-semibold text-brand-heading">Features</th>
              <th className="px-4 py-4 text-center font-display text-sm sm:text-base font-semibold text-brand-heading">Essentials</th>
              <th className="px-4 py-4 text-center font-display text-sm sm:text-base font-semibold text-brand-rose">
                Complete <span className="ml-1 align-middle text-[10px] uppercase tracking-wide bg-brand-rose text-white rounded-full px-2 py-0.5">Popular</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.label} className={i % 2 === 0 ? "bg-transparent" : "bg-brand-surface/30"}>
                <td className="px-4 py-3 font-body text-sm text-brand-body">{f.label}</td>
                <td className="px-4 py-3 text-center"><Cell v={f.e} /></td>
                <td className="px-4 py-3 text-center"><Cell v={f.c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default ComparePackages;
