import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoShouldConsider from "@/components/WhoShouldConsider";
import MoreThanDate from "@/components/MoreThanDate";
import YouTubeSection from "@/components/YouTubeSection";
import ComparePackages from "@/components/ComparePackages";
import Pricing from "@/components/Pricing";
import PressStrip from "@/components/PressStrip";
import Testimonials from "@/components/Testimonials";
import Celebrities from "@/components/Celebrities";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import StickyDisclaimer from "@/components/StickyDisclaimer";
import DisclaimerPopup from "@/components/DisclaimerPopup";

const Index = () => (
  <>
    <DisclaimerPopup />
    <StickyDisclaimer />
    <Header />
    <Hero />
    <WhoShouldConsider />
    <MoreThanDate />
    <PressStrip />
    <Celebrities />
    <Testimonials />
    <YouTubeSection />
    <About />
    <ComparePackages />
    <Pricing />
    <FAQ />
    <FinalCTA />
    <Footer />
    <MobileCTABar />
  </>
);

export default Index;
