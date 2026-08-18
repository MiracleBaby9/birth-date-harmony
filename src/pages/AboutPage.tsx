import SiteLayout from "@/components/SiteLayout";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";

const AboutPage = () => (
  <SiteLayout>
    <div className="pt-28 sm:pt-32 text-center container">
      <h1 className="heading-lg font-bold">About Himansshu Ji</h1>
      <p className="body-md text-brand-muted mt-3 max-w-2xl mx-auto">
        Two decades of numerology practice, guiding families through life's biggest decisions.
      </p>
    </div>
    <About />
    <FinalCTA />
  </SiteLayout>
);

export default AboutPage;
