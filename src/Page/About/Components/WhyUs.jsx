// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaMobileAlt, FaRocket, FaLock, FaPalette, FaSyncAlt, FaChartLine } from "react-icons/fa";
const WhyUs = () => {
    return (
        <div>
            {/* Overview */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-6"
                >
                    Why Choose Us?
                </motion.h2>
                <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg">
                    We craft apps that are not only visually stunning but also high-performing, secure, and tailored for both Android and iOS platforms.
                </p>
            </section>
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">

                    {/* Feature 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaRocket />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                        <p className="text-gray-600">
                            Lightning-fast apps built for speed and smooth user experience.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaLock />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
                        <p className="text-gray-600">
                            We ensure data protection with enterprise-grade security measures.
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaPalette />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Modern UI/UX</h3>
                        <p className="text-gray-600">
                            Custom, user-friendly designs that keep users engaged.
                        </p>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaMobileAlt />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
                        <p className="text-gray-600">
                            Single codebase for Android & iOS to save time and cost.
                        </p>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaSyncAlt />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Seamless Updates</h3>
                        <p className="text-gray-600">
                            Easily maintain and update apps with continuous support.
                        </p>
                    </motion.div>

                    {/* Feature 6 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="text-indigo-600 text-4xl mb-4">
                            <FaChartLine />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Growth Ready</h3>
                        <p className="text-gray-600">
                            Apps built to handle your business growth and scale globally.
                        </p>
                    </motion.div>

                </div>
            </section>

        </div>
    );
};

export default WhyUs;