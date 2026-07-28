import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "needHelpTooltipDismissed";
const WHATSAPP_URL = "https://wa.me/919667305577?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20package";

const NeedHelpTooltip = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const pricing = document.getElementById("pricing");
    if (!pricing) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When pricing section has been scrolled past (no longer intersecting and below viewport top)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(pricing);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-4 sm:right-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-xs"
        >
          <div className="relative rounded-2xl bg-brand-card border border-brand-rose/40 shadow-[0_10px_30px_rgba(196,120,138,0.25)] backdrop-blur-md p-4 pr-9">
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 p-1 rounded-full text-brand-muted hover:text-brand-heading transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="font-display text-sm font-semibold text-brand-heading">
              Need help choosing? 💬
            </p>
            <p className="mt-1 font-body text-xs text-brand-body leading-relaxed">
              Our experts will guide you to the perfect package for your family.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-rose text-white font-body text-xs font-semibold px-4 py-2 hover:bg-brand-rose-dark transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeedHelpTooltip;
