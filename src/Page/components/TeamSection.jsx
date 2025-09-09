/* eslint-disable no-unused-vars */
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const teamMembers = [
    {
        name: "Tawhidul Islam",
        role: "Frontend Developer",
        image: "https://i.pravatar.cc/300?img=12",
        facebook: "#",
        twitter: "#",
        linkedin: "#",
    },
    {
        name: "Ayesha Khan",
        role: "UI/UX Designer",
        image: "https://i.pravatar.cc/300?img=32",
        facebook: "#",
        twitter: "#",
        linkedin: "#",
    },
    {
        name: "Rahim Uddin",
        role: "Backend Developer",
        image: "https://i.pravatar.cc/300?img=44",
        facebook: "#",
        twitter: "#",
        linkedin: "#",
    },
    {
        name: "Sarah Ali",
        role: "Project Manager",
        image: "https://i.pravatar.cc/300?img=47",
        facebook: "#",
        twitter: "#",
        linkedin: "#",
    },
];

const TeamSection = () => {
    return (
        <div className="py-20 bg-[#F5FAFF]"> {/* Extra Light Background */}
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-6 text-[#0F172A]"> {/* Text Dark */}
                    Meet Our Team
                </h2>
                <p className="mb-14 text-lg text-[#475569]"> {/* Text Medium */}
                    Talented people behind our success
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card w-full max-w-sm bg-white shadow-2xl hover:shadow-[#2974FF]/40 transition duration-300 p-6 border border-[#CBD5E1]" // Border Gray
                        >
                            <figure className="px-6 pt-6">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="rounded-full w-40 h-40 object-cover border-4 border-[#2974FF]" // Primary
                                />
                            </figure>

                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-2xl text-[#0F172A]">
                                    {member.name}
                                </h2>
                                <p className="text-base text-[#475569]">{member.role}</p>

                                <div className="flex gap-6 mt-6">
                                    <a
                                        href={member.facebook}
                                        className="text-[#2974FF] hover:scale-125 transition"
                                    >
                                        <FaFacebook size={24} />
                                    </a>
                                    <a
                                        href={member.twitter}
                                        className="text-[#2974FF] hover:scale-125 transition"
                                    >
                                        <FaTwitter size={24} />
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        className="text-[#2974FF] hover:scale-125 transition"
                                    >
                                        <FaLinkedin size={24} />
                                    </a>
                                </div>

                                {/* Modern Animated Button */}
                                <Link to={'/memberDetails'}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn mt-6 relative overflow-hidden group bg-[#2974FF] text-white hover:text-[#2974FF] px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-[#1558D6] transition"
                                    >
                                        <span className="relative z-10 ">More Details</span>
                                        <motion.span
                                            className="absolute inset-0 bg-[#E6F0FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                        />
                                    </motion.button></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
