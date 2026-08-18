import SiteLayout from "@/components/SiteLayout";
import YouTubeSection from "@/components/YouTubeSection";
import FinalCTA from "@/components/FinalCTA";

const Videos = () => (
  <SiteLayout>
    <div className="pt-28 sm:pt-32 text-center container">
      <h1 className="heading-lg font-bold">Videos & Talks</h1>
      <p className="body-md text-brand-muted mt-3 max-w-2xl mx-auto">
        Watch Himansshu Ji explain how numerology guides date and name selection.
      </p>
    </div>
    <YouTubeSection />
    <FinalCTA />
  </SiteLayout>
);

export default Videos;
