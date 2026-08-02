import { useState } from "react";
import { motion } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";
import BookingFormModal from "./BookingFormModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 } as const,
  }),
};

const Feature = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex items-start gap-2 text-sm text-brand-body">
    <span className="mt-0.5">{icon}</span>
    <span>{text}</span>
  </li>
);

interface SelectedPackage {
  name: string;
  price: number;
}

const readPackageName = (key: string, fallback: string) => {
  const value = (import.meta.env[key] as string | undefined)?.trim();
  return value && Number.isNaN(Number(value)) ? value : fallback;
};

const readPackagePrice = (key: string, fallback: number) => {
  const rawValue = import.meta.env[key] as string | undefined;
  const normalizedValue = rawValue?.replace(/[^0-9.]/g, "");
  const price = Number(normalizedValue);
  return Number.isFinite(price) && price > 0 ? price : fallback;
};

const Pricing = () => {
  const [selected, setSelected] = useState<SelectedPackage | null>(null);

  const ESSENTIALS_NAME = readPackageName("VITE_PACKAGE_ESSENTIALS_NAME", "Essentials Package");
  const ESSENTIALS_PRICE = readPackagePrice("VITE_PACKAGE_ESSENTIALS_PRICE", 1097);

  const COMPLETE_NAME = readPackageName("VITE_PACKAGE_COMPLETE_NAME", "Complete Package");
  const COMPLETE_PRICE = readPackagePrice("VITE_PACKAGE_COMPLETE_PRICE", 3167);

  const openForm = (name: string, price: number) => setSelected({ name, price });

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

        <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {/* Essentials */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }}
            className="rounded-card bg-brand-card border border-brand-border p-6 flex flex-col">
            <div className="text-center mb-4">
              <span className="font-accent text-[52px] font-bold text-brand-rose">&#8377;{ESSENTIALS_PRICE.toLocaleString("en-IN")}</span>
              <h3 className="font-display text-xl font-semibold mt-1">{ESSENTIALS_NAME}</h3>
              <p className="text-brand-body text-sm mt-1">Perfect for parents who want the right date, confidently chosen.</p>
            </div>
            <ul className="space-y-3 flex-1">
              <Feature icon="🗓️" text="Top 3 Auspicious Dates — Priority Based Selection" />
              <Feature icon="📿" text="Panchang, Tithi, Mool & Nakshatra Analysis" />
              <Feature icon="🔢" text="Numerologically Powerful Dates" />
              <Feature icon="🪐" text="Mulank, Bhagyank & Rajyog Analysis" />
              <Feature icon="⏰" text="Shubh Muhurat Timings for Baby Delivery" />
              <Feature icon="💬" text="15-Day Priority Support for Emergency Guidance" />
            </ul>
            <button onClick={() => openForm(ESSENTIALS_NAME, ESSENTIALS_PRICE)} className="mt-6 block w-full text-center rounded-full border-2 border-brand-rose text-brand-rose font-body font-semibold py-2.5 transition-colors hover:bg-brand-rose hover:text-white">
              Get Started — ₹{ESSENTIALS_PRICE.toLocaleString("en-IN")}
            </button>
          </motion.div>

          {/* Complete - elevated */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
            className="rounded-card bg-brand-surface border-2 border-brand-rose p-8 flex flex-col relative shadow-[0_0_28px_rgba(196,120,138,0.25)] md:-mt-4 md:mb-[-1rem]">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-rose text-white text-xs font-body font-semibold px-4 py-1">
              ✦ Most Popular
            </span>
            <div className="text-center mb-4">
              <span className="font-accent text-[60px] font-bold text-brand-rose">&#8377;{COMPLETE_PRICE.toLocaleString("en-IN")}</span>
              <h3 className="font-display text-xl font-semibold mt-1">{COMPLETE_NAME}</h3>
              <p className="text-brand-body text-sm mt-1">For parents who want the full picture — dates, name & beyond.</p>
            </div>
            <ul className="space-y-3 flex-1">
              <Feature icon="✅" text="Everything in Essentials, plus:" />
              <Feature icon="🔤" text="Swar / Alphabet Suggestion as per Nakshatra" />
              <Feature icon="📄" text="Perfect Baby Name Report (50+ Pages)" />
              <Feature icon="🎨" text="Lucky Colors & Numbers" />
              <Feature icon="💬" text="Upgraded to 21-Day Priority Support" />
            </ul>
            <button onClick={() => openForm(COMPLETE_NAME, COMPLETE_PRICE)} className="mt-6 block w-full text-center rounded-full bg-brand-rose text-white font-body font-semibold py-3 transition-transform hover:scale-105">
              Get Started — ₹{COMPLETE_PRICE.toLocaleString("en-IN")}
            </button>
          </motion.div>
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
        />
      )}
    </section>
  );
};

export default Pricing;
