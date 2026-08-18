import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import WhoShouldConsider from "@/components/WhoShouldConsider";
import MoreThanDate from "@/components/MoreThanDate";
import PressStrip from "@/components/PressStrip";
import ComparePackages from "@/components/ComparePackages";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";

const Index = () => (
  <SiteLayout>
    <Hero />
    <WhoShouldConsider />
    <MoreThanDate />
    <PressStrip />
    <ComparePackages />
    <Pricing />
    <FinalCTA />
  </SiteLayout>
);

export default Index;
