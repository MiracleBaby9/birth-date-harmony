import { motion } from "framer-motion";
import DisclaimerLine from "./DisclaimerLine";

const FinalCTA = () => (
  <section className="py-20 bg-gradient-warm">
    <div className="container text-center space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="heading-lg font-bold text-white"
      >
        Ready to Give Your Child a Thoughtful Beginning?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/70 text-lg"
      >
        Choose a beginning that supports balance and strength.
      </motion.p>
      <motion.a
        href="#pricing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="keep-color inline-block rounded-full bg-white text-brand-heading px-8 py-3.5 text-base font-body font-semibold shadow-lg transition-transform hover:scale-105"
      >
        Get My C-Section Baby Dates Now
      </motion.a>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <DisclaimerLine light />
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
