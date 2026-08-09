import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import DisclaimerLine from "./DisclaimerLine";
import BookingFormModal, { type PackageAddon } from "./BookingFormModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 } as const,
  }),
};

const Feature = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2.5 text-sm text-brand-body">
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sage/15 text-brand-sage">
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
    <span>{text}</span>
  </li>
);

const PROTECTION_ADDON: PackageAddon = {
  id: "protection",
  name: "Delivery Date Change Protection",
  price: 1367,
  description:
    "If your delivery gets preponed (or rescheduled) by your doctor, we recalculate and give you a fresh set of auspicious dates & muhurat.",
  recommended: true,
};

const NICKNAME_ADDON: PackageAddon = {
  id: "nickname",
  name: "Nickname Analysis",
  price: 1367,
  description: "A numerologically aligned pet name / nickname for your baby, analysed and corrected.",
};

const EXTRA_NAMES_ADDON: PackageAddon = {
  id: "extra-names",
  name: "10+ Extra Numerologically Aligned Names",
  price: 1367,
  description: "An additional set of 10+ curated name options to choose from.",
};

const DATE_FEATURES = [
  "Top 3 Auspicious Dates — Priority Based Selection",
  "Panchang, Tithi, Mool & Nakshatra Analysis",
  "Numerologically Powerful Dates",
  "Mulank, Bhagyank & Rajyog Analysis",
  "Shubh Muhurat Timings for Baby Delivery",
];

const NAME_FEATURES = [
  "10+ Numerologically Aligned Name Options",
  "Already Have a Name? We'll Correct It Too",
  "Child's Mulank & Bhagyank Analysis",
  "First Name & Full Name Analysis",
  "Compound Number Analysis",
  "Personal Loshu Grid",
  "First Alphabet Analysis",
  "PDF Report (45+ Pages)",
  "Call Consultation Included",
];

interface Tier {
  id: string;
  name: string;
  price: number;
  tagline: string;
  badge?: string;
  features: string[];
  addons: PackageAddon[];
  highlight?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: 3437,
    tagline: "Perfect for parents who want the right date, confidently chosen.",
    features: DATE_FEATURES,
    addons: [PROTECTION_ADDON],
  },
  {
    id: "advanced",
    name: "Advanced Package",
    price: 6137,
    tagline: "For parents who want the full picture — dates, name & beyond.",
    badge: "✦ Most Popular",
    highlight: true,
    features: ["Everything in Starter, plus:", ...NAME_FEATURES],
    addons: [NICKNAME_ADDON, PROTECTION_ADDON],
  },
  {
    id: "complete",
    name: "Complete Package",
    price: 8567,
    tagline: "The complete numerology blueprint for your baby's lifetime.",
    badge: "✦ Complete Blueprint",
    features: [
      "Everything in Advanced, plus:",
      "Nickname Analysis",
      "Ideal Career Path Analysis",
      "Lucky Direction (Feng Shui)",
      "Lucky Colors Analysis",
      "Lucky Numbers Analysis",
    ],
    addons: [EXTRA_NAMES_ADDON, PROTECTION_ADDON],
  },
];

const Pricing = () => {
  const [selected, setSelected] = useState<Tier | null>(null);

  return (
    <section id="pricing" className="py-20 scroll-mt-20">
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }} className="text-center mb-12 space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            C-Section Baby Dates — Choose Your Package
          </h2>
          <p className="font-accent italic text-brand-gold text-lg">
            Everything you need for a powerful, supported beginning
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 items-stretch max-w-6xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              className={
                tier.highlight
                  ? "rounded-card bg-brand-surface border-2 border-brand-rose p-8 flex flex-col relative shadow-[0_0_28px_rgba(196,120,138,0.25)] md:-mt-4 md:mb-[-1rem]"
                  : "rounded-card bg-brand-card border border-brand-border p-6 flex flex-col relative"
              }
            >
              {tier.badge && (
                <span
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full text-xs font-body font-semibold px-4 py-1 ${
                    tier.highlight ? "bg-gradient-warm text-white" : "bg-brand-heading text-white"
                  }`}
                >
                  {tier.badge}
                </span>
              )}
              <div className="text-center mb-4">
                <span className={`font-accent font-bold text-brand-rose ${tier.highlight ? "text-[54px]" : "text-[46px]"}`}>
                  &#8377;{tier.price.toLocaleString("en-IN")}
                </span>
                <h3 className="font-display text-xl font-semibold mt-1">{tier.name}</h3>
                <p className="text-brand-body text-sm mt-1">{tier.tagline}</p>
              </div>
              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <Feature key={f} text={f} />
                ))}
              </ul>

              <div className="mt-5 rounded-lg border border-dashed border-brand-rose/50 bg-brand-rose/5 px-3 py-2.5">
                <p className="font-display text-xs font-semibold text-brand-heading">Optional Add-ons</p>
                <ul className="mt-1 space-y-1">
                  {tier.addons.map((a) => (
                    <li key={a.id} className="flex justify-between gap-2 text-xs text-brand-body">
                      <span>{a.name}</span>
                      <span className="font-accent whitespace-nowrap">+₹{a.price.toLocaleString("en-IN")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelected(tier)}
                className={
                  tier.highlight
                    ? "mt-6 block w-full text-center rounded-full bg-gradient-warm text-white font-body font-semibold py-3 transition-transform hover:scale-105"
                    : "mt-6 block w-full text-center rounded-full border-2 border-brand-rose text-brand-rose font-body font-semibold py-2.5 transition-colors hover:bg-gradient-warm hover:text-white"
                }
              >
                Get Started — ₹{tier.price.toLocaleString("en-IN")}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 space-y-3">
          <p className="text-brand-muted text-sm">
            All packages include confidential handling of your personal details. Delivery via secure email.
          </p>
          <DisclaimerLine />
        </div>
      </div>

      {selected && (
        <BookingFormModal
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(null)}
          packageName={selected.name}
          packagePrice={selected.price}
          addons={selected.addons}
        />
      )}
    </section>
  );
};

export default Pricing;
