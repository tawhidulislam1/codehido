import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";
import CallToAction from "../Home/components/CallToAction";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <>
            {pathname === '/' && <CallToAction />}
            <footer className="relative bg-[#0F172A] text-white overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#122344] to-[#0F172A]">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2974FF]/20 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1558D6]/20 blur-[150px] rounded-full"></div>
                </div>

                <div className="relative container mx-auto px-6 pt-20 pb-10 grid grid-cols-1 md:grid-cols-4 gap-14">
                    {/* Brand */}
                    <div>
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            Code
                            <span className="text-[#2974FF] drop-shadow-md">hido</span>
                        </h2>
                        <p className="mt-5 text-gray-300 leading-relaxed max-w-xs">
                            Crafting modern, scalable, and visually striking digital solutions
                            to accelerate your business in today’s competitive market.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-5 relative">
                            Quick Links
                            <span className="block w-12 h-[2px] bg-[#2974FF] mt-1"></span>
                        </h3>
                        <ul className="space-y-3">
                            {["Home", "About", "Services", "Portfolio", "Contact"].map(
                                (link) => (
                                    <li key={link}>
                                        <a
                                            href={`/${link.toLowerCase()}`}
                                            className="text-gray-400 hover:text-[#2974FF] transition-all duration-300 hover:translate-x-1 inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-5 relative">
                            Contact
                            <span className="block w-12 h-[2px] bg-[#2974FF] mt-1"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 group">
                                <FaEnvelope className="text-[#2974FF] group-hover:scale-110 transition-transform" />
                                <a
                                    href="mailto:codehido@example.com"
                                    className="text-gray-400 hover:text-[#2974FF] transition-colors"
                                >
                                    codehido@example.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <FaPhoneAlt className="text-[#2974FF] group-hover:scale-110 transition-transform" />
                                <a
                                    href="tel:+8801878457216"
                                    className="text-gray-400 hover:text-[#2974FF] transition-colors"
                                >
                                    +880 1878-457216
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-5 relative">
                            Follow Us
                            <span className="block w-12 h-[2px] bg-[#2974FF] mt-1"></span>
                        </h3>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                                (Icon, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-[#2974FF] bg-opacity-80 backdrop-blur-sm shadow-lg hover:bg-[#1558D6] transition-all duration-300 hover:scale-110"
                                    >
                                        <Icon className="text-white text-lg" />
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="relative border-t border-white/10 mt-10 py-5 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Codehido. All rights reserved.
                </div>
            </footer>
        </>
    );
}
