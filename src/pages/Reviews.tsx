import SiteLayout from "@/components/SiteLayout";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

const Reviews = () => (
  <SiteLayout>
    <div className="pt-28 sm:pt-32 text-center container">
      <h1 className="heading-lg font-bold">Parent Reviews</h1>
      <p className="body-md text-brand-muted mt-3 max-w-2xl mx-auto">
        Families across India who planned their baby's arrival with numerological guidance.
      </p>
    </div>
    <Testimonials />
    <FinalCTA />
  </SiteLayout>
);

export default Reviews;
