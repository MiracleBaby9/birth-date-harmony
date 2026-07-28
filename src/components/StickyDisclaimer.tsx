import { useEffect, useState } from "react";

const StickyDisclaimer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-brand-heading/95 backdrop-blur-sm px-3 py-1.5 text-center text-white/85">
        <p className="mx-auto max-w-5xl text-[10.5px] sm:text-[11.5px] font-body leading-tight">
          <span className="font-semibold text-white">Disclaimer:</span>{" "}
          <span className="hidden sm:inline">
            Date selection is advisory and does not replace medical advice. Always consult your doctor.
          </span>
          <span className="sm:hidden">
            Advisory only — always consult your doctor before final decisions.
          </span>
        </p>
      </div>
    </div>
  );
};

export default StickyDisclaimer;
