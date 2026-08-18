import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import StickyDisclaimer from "@/components/StickyDisclaimer";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LiveTicker from "@/components/LiveTicker";


const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <>
      <DisclaimerPopup />
      <StickyDisclaimer />
      <Header />
      <main className="gold-frame">{children}</main>
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
      <LiveTicker />

    </>
  );
};

export default SiteLayout;
