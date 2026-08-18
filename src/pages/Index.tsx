import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import TrustCompact from "@/components/TrustCompact";
import PressStrip from "@/components/PressStrip";
import MoreThanDate from "@/components/MoreThanDate";
import YouTubeSection from "@/components/YouTubeSection";
import WhoShouldConsider from "@/components/WhoShouldConsider";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

const Index = () => (
  <SiteLayout>
    <Hero />
    {/* Page 2 — celebrity endorsements & press */}
    <TrustCompact />
    <PressStrip />
    {/* Philosophy */}
    <MoreThanDate />
    {/* Insightful podcasts */}
    <YouTubeSection />
    {/* The challenge */}
    <WhoShouldConsider />
    <Pricing />
    <Testimonials />
    <FinalCTA />
  </SiteLayout>
);

export default Index;
