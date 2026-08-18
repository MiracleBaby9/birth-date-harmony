import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const MobileCTABar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div className="flex items-center gap-2 rounded-card bg-gradient-warm px-3 py-3 shadow-lift">
        <a
          href="/#pricing"
          className="flex flex-1 items-center justify-center gap-2 font-body text-base font-extrabold uppercase tracking-[0.14em] text-white"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          Buy Now
        </a>
        <a
          href="/#pricing"
          className="whitespace-nowrap rounded-full bg-white/25 px-4 py-2 font-body text-sm font-semibold text-white backdrop-blur-sm"
        >
          View Packages →
        </a>
      </div>
    </div>
  );
};

export default MobileCTABar;
