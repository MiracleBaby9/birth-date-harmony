import { motion } from "framer-motion";
import himansshuPhoto from "@/assets/himansshu-agarwal.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => (
  <section className="py-20">
    <div className="container max-w-2xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="rounded-card bg-brand-surface border border-brand-border p-8 relative overflow-hidden"
      >
        {/* Left rose accent strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-rose/40" />

        <h2 className="heading-md font-bold text-center mb-6">
          About Himansshu Agarwal Ji
        </h2>

        <div className="flex justify-center mb-5">
          <div className="w-[120px] h-[120px] rounded-full border-[3px] border-brand-rose overflow-hidden shadow-lg">
            <img
              src={himansshuPhoto}
              alt="Himansshu Agarwal Ji — Name Correction Expert"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <p className="text-brand-body text-center leading-relaxed">
          Himansshu Agarwal Ji is a widely recognised Name Correction Expert and Lal Kitab Remedy Specialist, with over 10 years of dedicated research and practical experience in name vibration patterns, brand failure case studies, and corrective Lal Kitab remedies.
        </p>
      </motion.div>
    </div>
  </section>
);

export default About;
