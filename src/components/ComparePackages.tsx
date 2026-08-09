import { motion } from "framer-motion";

type Val = boolean | string;

const features: { label: string; s: Val; a: Val; c: Val }[] = [
  { label: "Top 3 Auspicious Dates", s: true, a: true, c: true },
  { label: "Panchang, Tithi, Mool & Nakshatra Analysis", s: true, a: true, c: true },
  { label: "Numerologically Powerful Dates", s: true, a: true, c: true },
  { label: "Mulank, Bhagyank & Rajyog Analysis", s: true, a: true, c: true },
  { label: "Shubh Muhurat Timings", s: true, a: true, c: true },
  { label: "10+ Numerologically Aligned Name Options", s: false, a: true, c: true },
  { label: "Already Have a Name? We'll Correct It Too", s: false, a: true, c: true },
  { label: "Child's Mulank & Bhagyank Analysis", s: false, a: true, c: true },
  { label: "First Name & Full Name Analysis", s: false, a: true, c: true },
  { label: "Compound Number Analysis", s: false, a: true, c: true },
  { label: "Personal Loshu Grid", s: false, a: true, c: true },
  { label: "First Alphabet Analysis", s: false, a: true, c: true },
  { label: "PDF Report (45+ Pages)", s: false, a: true, c: true },
  { label: "Call Consultation Included", s: false, a: true, c: true },
  { label: "Nickname Analysis", s: false, a: "Add-on ₹1,367", c: true },
  { label: "Ideal Career Path Analysis", s: false, a: false, c: true },
  { label: "Lucky Direction (Feng Shui)", s: false, a: false, c: true },
  { label: "Lucky Colors & Lucky Numbers Analysis", s: false, a: false, c: true },
  { label: "10+ Extra Aligned Names", s: false, a: false, c: "Add-on ₹1,367" },
  { label: "Delivery Date Change Protection", s: "Add-on ₹1,367", a: "Add-on ₹1,367", c: "Add-on ₹1,367" },
];

const Cell = ({ v }: { v: Val }) => {
  if (typeof v === "string") return <span className="font-body text-xs text-brand-gold">{v}</span>;
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
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-brand-border bg-brand-surface/60">
              <th className="px-4 py-4 font-display text-sm sm:text-base font-semibold text-brand-heading">Features</th>
              <th className="px-4 py-4 text-center font-display text-sm sm:text-base font-semibold text-brand-heading">Starter</th>
              <th className="px-4 py-4 text-center font-display text-sm sm:text-base font-semibold text-brand-rose">
                Advanced <span className="ml-1 align-middle text-[10px] uppercase tracking-wide bg-brand-rose text-white rounded-full px-2 py-0.5">Popular</span>
              </th>
              <th className="px-4 py-4 text-center font-display text-sm sm:text-base font-semibold text-brand-heading">Complete</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.label} className={i % 2 === 0 ? "bg-transparent" : "bg-brand-surface/30"}>
                <td className="px-4 py-3 font-body text-sm text-brand-body">{f.label}</td>
                <td className="px-4 py-3 text-center"><Cell v={f.s} /></td>
                <td className="px-4 py-3 text-center"><Cell v={f.a} /></td>
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
