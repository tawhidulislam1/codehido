/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", { email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: "#E6F0FF" }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{ background: "#F5FAFF" }}
            >
                {/* Floating Circle */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-70 blur-3xl"
                    style={{ background: "linear-gradient(135deg, #2974FF, #1558D6)" }}
                ></motion.div>

                <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#0F172A" }}>
                    Welcome to <span style={{ color: "#2974FF" }}>Codehido</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1" style={{ color: "#475569" }}>
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none transition"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1" style={{ color: "#475569" }}>
                            Password
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none transition"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-lg shadow-md transition"
                        style={{ background: "linear-gradient(90deg, #2974FF, #1558D6)", color: "#FFF" }}
                    >
                        Login
                    </motion.button>
                </form>

                <p className="text-center text-sm mt-5" style={{ color: "#475569" }}>
                    Don’t have an account?{" "}
                    <Link to="/register" style={{ color: "#2974FF", fontWeight: "500" }}>
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
