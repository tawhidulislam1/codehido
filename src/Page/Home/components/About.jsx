import { FaCheckCircle } from "react-icons/fa";
const About = () => {
    return (
        <section className="relative bg-white py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Image */}
                <div className="relative group">
                    <img
                        src='https://bugbuild.com/frontend/img/banner/banner-4.png'
                        alt="Why Choose CodeHido?"
                        className="rounded-2xl shadow-2xl w-full object-cover transform group-hover:scale-[1.02] transition-all duration-500"
                    />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#2974FF]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1558D6]/10 rounded-full blur-3xl"></div>
                </div>

                {/* Right - Content */}
                <div className="space-y-6">
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
                            <li key={idx} className="flex items-start gap-3">
                                <FaCheckCircle className="text-[#2974FF] text-lg mt-[2px]" />
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <a
                        href="/about"
                        className="inline-block px-6 py-3 bg-[#2974FF] text-white font-medium rounded-lg shadow-lg hover:bg-[#1558D6] transform hover:scale-105 transition-all duration-300"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
}
export default About