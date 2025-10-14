
import { FaCheckCircle } from "react-icons/fa";

const AboutSection = () => {
    return (
        <section className="relative bg-white py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Left - Image */}
                <div className="relative group order-1 lg:order-none">
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                        <img
                            src="https://bugbuild.com/frontend/img/banner/banner-4.png"
                            alt="Why Choose CodeHido?"
                            className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-all duration-500"
                        />
                    </div>

                    {/* Decorative Blurs */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#2974FF]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#1558D6]/10 rounded-full blur-3xl"></div>
                </div>

                {/* Right - Content */}
                <div className="space-y-6 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-snug">
                        Why Choose <span className="text-[#2974FF]">CodeHido?</span>
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        At CodeHido, we are committed to delivering innovative, scalable,
                        and visually stunning digital solutions that empower your business
                        to thrive in the competitive digital era.
                    </p>

                    <ul className="space-y-3 text-sm sm:text-base">
                        {[
                            "Expert team with years of industry experience",
                            "Tailored solutions for your business goals",
                            "Cutting-edge technologies for future-ready projects",
                        ].map((point, idx) => (
                            <li
                                key={idx}
                                className="flex items-start justify-center lg:justify-start gap-3"
                            >
                                <FaCheckCircle className="text-[#2974FF] text-lg mt-[2px]" />
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="/about"
                        className="inline-block mt-4 px-6 py-3 bg-[#2974FF] text-white font-medium rounded-lg shadow-lg hover:bg-[#1558D6] transform hover:scale-105 transition-all duration-300"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
