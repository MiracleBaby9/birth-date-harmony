import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import TrustCompact from "@/components/TrustCompact";
import LazySection from "@/components/LazySection";

const Index = () => (
  <SiteLayout>
    <Hero />
    {/* Page 2 — celebrity endorsements & press */}
    <TrustCompact />
    <LazySection loader={() => import("@/components/PressStrip")} minHeight={200} />
    {/* Philosophy */}
    <LazySection loader={() => import("@/components/MoreThanDate")} minHeight={480} />
    <LazySection loader={() => import("@/components/Pricing")} minHeight={600} />
    <LazySection loader={() => import("@/components/Testimonials")} minHeight={420} />
    {/* Insightful podcasts */}
    <LazySection loader={() => import("@/components/YouTubeSection")} minHeight={420} />
    {/* The challenge */}
    <LazySection loader={() => import("@/components/WhoShouldConsider")} minHeight={480} />
    <LazySection loader={() => import("@/components/FinalCTA")} minHeight={320} />
  </SiteLayout>
);

export default Index;
