// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CallToAction = () => {
    return (
        <section
            className="relative py-10 text-white overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
            }}
        >
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1558D6]/90 via-[#0F172A]/85 to-[#1558D6]/85"></div>

            {/* Animated background glow circles */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
                {/* Animated Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                >
                    Ready to <span className="text-[#c4d8ff]">Build</span> Your Dream Website?
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-gray-200 mb-8"
                >
                    Let’s create something amazing together.
                </motion.p>

                {/* Button with Hover Animation */}
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-10 py-4 font-bold rounded-full shadow-lg text-[#2974FF] bg-white
    hover:bg-[#1E40AF] hover:text-white hover:shadow-md transition-colors duration-300"
                >
                    Contact Us Today 🚀
                </motion.a>

            </div>
        </section>
    );
};

export default CallToAction;
