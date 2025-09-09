import React, { useState } from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";

const Connect = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#F5FAFF] flex items-center justify-center p-6">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

                {/* Left Section - Form */}
                <div className="md:w-3/5 p-12">
                    <h1 className="text-5xl font-bold text-[#0F172A] mb-2 relative inline-block">
                        Let's Connect
                        <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-[#2974FF] via-[#1558D6] to-[#2974FF] rounded-full animate-pulse"></span>
                    </h1>
                    <p className="text-[#475569] mb-10">
                        Have a question or want to collaborate? Fill out the form below!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                            className="w-full p-5 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF] transition-all"
                        />

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Your Email"
                            className="w-full p-5 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF] transition-all"
                        />

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Your Message"
                            className="w-full p-5 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF] transition-all"
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-[#2974FF] hover:bg-[#1558D6] text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
                        >
                            Send Message
                        </button>

                        {success && (
                            <p className="text-green-500 mt-2">Message sent successfully!</p>
                        )}
                    </form>
                </div>

                {/* Right Section - Contact Info */}
                <div className="md:w-2/5 bg-[#E6F0FF] p-12 flex flex-col justify-center items-start">
                    <h2 className="text-3xl font-semibold text-[#0F172A] mb-6">
                        Contact Info
                    </h2>
                    <p className="text-[#475569] mb-4">
                        <strong>Email:</strong> info@codehido.com
                    </p>
                    <p className="text-[#475569] mb-4">
                        <strong>Phone:</strong> +880 1878 457216
                    </p>
                    <p className="text-[#475569] mb-6">
                        <strong>Address:</strong> Feni, Bangladesh
                    </p>

                    <div className="flex space-x-4 mt-4">
                        {[FaLinkedin, FaTwitter, FaGithub, FaEnvelope].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-[#2974FF] hover:text-[#1558D6] text-3xl transition-transform transform hover:scale-110"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connect;
