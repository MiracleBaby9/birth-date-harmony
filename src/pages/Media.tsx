import SiteLayout from "@/components/SiteLayout";
import PressStrip from "@/components/PressStrip";
import Celebrities from "@/components/Celebrities";
import FinalCTA from "@/components/FinalCTA";

const Media = () => (
  <SiteLayout>
    <div className="pt-28 sm:pt-32 text-center container">
      <h1 className="heading-lg font-bold">Media &amp; Celebrity Clients</h1>
      <p className="body-md text-brand-muted mt-3 max-w-2xl mx-auto">
        Featured in leading publications and trusted by names from film and business.
      </p>
    </div>
    <PressStrip />
    <Celebrities />
    <FinalCTA />
  </SiteLayout>
);

export default Media;
