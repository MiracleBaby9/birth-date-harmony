import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const DISCLAIMER_KEY = "ankshaastra_disclaimer_accepted_session";

const DisclaimerPopup = () => {
  const [open, setOpen] = useState(() => !sessionStorage.getItem(DISCLAIMER_KEY));

  const handleAgree = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, "true");
    setOpen(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="w-[92vw] max-w-[420px] max-h-[90vh] p-0 border-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[hsl(28,78%,97%)] to-[hsl(16,100%,96%)] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* Header accent line */}
          <div className="mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-brand-gold to-brand-rose opacity-80" />

          <DialogTitle className="text-center font-display text-lg sm:text-xl font-bold text-brand-heading leading-tight">
            Legal Disclaimer
          </DialogTitle>

          <div className="text-center">
            <p className="font-accent text-sm sm:text-base font-semibold text-brand-gold tracking-wide">
              Ankshaastra Occult Experts LLP
            </p>
            <p className="font-body text-xs text-brand-muted mt-0.5">
              Astro-Numerologist Himansshu Agarwal
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-brand-border">
            <p className="font-body text-xs sm:text-[13px] leading-relaxed text-brand-body text-center">
              Ankshaastra Occult Experts LLP and Astro-Numerologist Himansshu Agarwal provide{" "}
              <span className="font-semibold text-brand-heading">numerology, astrology, and spiritual guidance only</span>.
              This website does not offer medical, legal, financial, or psychological advice.
            </p>
            <p className="font-body text-xs sm:text-[13px] leading-relaxed text-brand-body text-center mt-2.5">
              By clicking <span className="font-semibold text-brand-heading">"I Agree,"</span> you accept that use of this
              website is <span className="font-semibold">voluntary and at your own risk</span>, and no liability is accepted
              for decisions made based on its content or services.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExit}
              className="flex-1 py-2.5 rounded-xl font-body text-sm font-medium border border-brand-border text-brand-muted hover:bg-brand-surface transition-colors"
            >
              Exit
            </button>
            <button
              onClick={handleAgree}
              className="flex-1 py-2.5 rounded-xl font-body text-sm font-semibold text-white bg-gradient-to-r from-brand-rose to-brand-rose-dark hover:opacity-90 transition-opacity shadow-md"
            >
              I Agree
            </button>
          </div>

          <p className="text-center font-body text-[10px] sm:text-[11px] text-brand-muted leading-snug">
            By continuing, you accept the disclaimer and website terms.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerPopup;
