import SiteLayout from "@/components/SiteLayout";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

const FaqPage = () => (
  <SiteLayout>
    <div className="pt-28 sm:pt-32 text-center container">
      <h1 className="heading-lg font-bold">Frequently Asked Questions</h1>
      <p className="body-md text-brand-muted mt-3 max-w-2xl mx-auto">
        Everything parents ask before booking their C-section date guidance.
      </p>
    </div>
    <FAQ />
    <FinalCTA />
  </SiteLayout>
);

export default FaqPage;
