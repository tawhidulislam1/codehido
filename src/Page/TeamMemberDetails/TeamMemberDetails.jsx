/* eslint-disable no-unused-vars */
import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

// Define the member object
const memberData = {
    name: "Tawhidul Islam",
    role: "Frontend Developer",
    bio: "Passionate frontend developer with 4 years of web design experience and 1 year of React/MERN stack development. Loves clean, responsive UI and seamless UX.",
    email: "designwithtawhid@gmail.com",
    phone: "+8801878457216",
    image: "https://i.pravatar.cc/300?img=12",
    social: {
        linkedin: "https://linkedin.com/in/tawhidulislam",
        twitter: "https://twitter.com/tawhidulislam",
        github: "https://github.com/tawhidulislam",
        email: "designwithtawhid@gmail.com",
    },
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const socialVariants = {
    hover: { scale: 1.2, rotate: 5 },
};

// Component
const TeamMemberDetails = ({ member }) => {
    return (
        <div className="min-h-screen bg-[#F5FAFF] flex items-center justify-center p-6">
            <motion.div
                className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left: Profile Image */}
                <motion.div
                    className="flex-shrink-0"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />
                </motion.div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col">
                    <motion.h1
                        className="text-4xl font-bold text-[#0F172A] mb-2"
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {member.name}
                    </motion.h1>

                    <motion.h2
                        className="text-xl text-[#2974FF] font-semibold mb-4"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {member.role}
                    </motion.h2>

                    <motion.p
                        className="text-[#475569] mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {member.bio}
                    </motion.p>

                    {/* Contact Info */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <p className="text-[#475569]">
                            <strong>Email:</strong> {member.email}
                        </p>
                        <p className="text-[#475569]">
                            <strong>Phone:</strong> {member.phone}
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        {member.social.linkedin && (
                            <motion.a
                                href={member.social.linkedin}
                                className="text-[#2974FF] hover:text-[#1558D6] text-2xl"
                                variants={socialVariants}
                                whileHover="hover"
                            >
                                <FaLinkedin />
                            </motion.a>
                        )}
                        {member.social.twitter && (
                            <motion.a
                                href={member.social.twitter}
                                className="text-[#2974FF] hover:text-[#1558D6] text-2xl"
                                variants={socialVariants}
                                whileHover="hover"
                            >
                                <FaTwitter />
                            </motion.a>
                        )}
                        {member.social.github && (
                            <motion.a
                                href={member.social.github}
                                className="text-[#2974FF] hover:text-[#1558D6] text-2xl"
                                variants={socialVariants}
                                whileHover="hover"
                            >
                                <FaGithub />
                            </motion.a>
                        )}
                        {member.social.email && (
                            <motion.a
                                href={`mailto:${member.social.email}`}
                                className="text-[#2974FF] hover:text-[#1558D6] text-2xl"
                                variants={socialVariants}
                                whileHover="hover"
                            >
                                <FaEnvelope />
                            </motion.a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

// Export with member data
export default function TeamMemberPage() {
    return <TeamMemberDetails member={memberData} />;
}
