import { FaCheckCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AboutSection = () => {
    return (
        <section className="relative bg-white py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left - Image */}
                <motion.div
                    className="relative group"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://bugbuild.com/frontend/img/banner/banner-4.png"
                        alt="Why Choose CodeHido?"
                        className="rounded-2xl shadow-2xl w-full object-cover transform group-hover:scale-[1.02] transition-all duration-500"
                    />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#2974FF]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1558D6]/10 rounded-full blur-3xl"></div>
                </motion.div>

                {/* Right - Content */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-[#0F172A] leading-snug">
                        Why Choose <span className="text-[#2974FF]">CodeHido?</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        At CodeHido, we are committed to delivering innovative, scalable,
                        and visually stunning digital solutions that empower your business
                        to thrive in the competitive digital era.
                    </p>

                    {/* Strengths */}
                    <ul className="space-y-3">
                        {[
                            "Expert team with years of industry experience",
                            "Tailored solutions for your business goals",
                            "Cutting-edge technologies for future-ready projects",
                        ].map((point, idx) => (
                            <motion.li
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <FaCheckCircle className="text-[#2974FF] text-lg mt-[2px]" />
                                <span className="text-gray-700">{point}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Button */}
                    <motion.a
                        href="/about"
                        className="inline-block px-6 py-3 bg-[#2974FF] text-white font-medium rounded-lg shadow-lg hover:bg-[#1558D6] transform hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Learn More
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
