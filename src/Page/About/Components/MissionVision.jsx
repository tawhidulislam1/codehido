// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const MissionVision = () => {
  return (
    <section className="py-20 bg-[#F5FAFF]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-8 text-center">
          Our Mission & Vision
        </h2>
        <p className="text-[#475569] mb-12 text-center max-w-3xl mx-auto">
          At CodeHido, we aim to empower businesses with innovative digital solutions
          that drive growth and create meaningful experiences. Our team focuses on
          combining technology, creativity, and strategy to deliver measurable results.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 bg-white border border-[#CBD5E1] rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaBullseye className="text-[#2974FF] text-5xl mr-4" />
              <h3 className="text-2xl font-semibold text-[#0F172A]">Our Mission</h3>
            </div>
            <p className="text-[#475569] leading-relaxed mb-4">
              To deliver top-notch, scalable, and visually stunning digital solutions 
              that help our clients achieve their business goals efficiently.
              <br /><br />
              We focus on innovation, creativity, and quality, ensuring every project 
              is designed to maximize impact and user engagement.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 bg-white border border-[#CBD5E1] rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaLightbulb className="text-[#1558D6] text-5xl mr-4" />
              <h3 className="text-2xl font-semibold text-[#0F172A]">Our Vision</h3>
            </div>
            <p className="text-[#475569] leading-relaxed mb-4">
              To be recognized as a leading digital solutions provider by creating
              innovative experiences that empower businesses worldwide.
              <br /><br />
              We envision a future where technology bridges the gap between businesses
              and their customers, delivering seamless, interactive, and impactful solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
