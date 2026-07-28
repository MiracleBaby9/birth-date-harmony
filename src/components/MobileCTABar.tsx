import { useEffect, useState } from "react";
import { getWhatsAppLink } from "@/lib/constants";

const MobileCTABar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-brand-surface/95 backdrop-blur-md border-t border-brand-border px-4 py-3">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center rounded-full bg-brand-rose px-6 py-3 text-sm font-body font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          💬 Get My C-Section Baby Dates Now
        </a>
      </div>
    </div>
  );
};

export default MobileCTABar;
