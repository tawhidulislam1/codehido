/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAdmin from "../../Hooks/useAdmin";
import useDeveloper from "../../Hooks/useDeveloper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { logIn, user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isDeveloper, isDeveloperLoading] = useDeveloper();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading || isAdminLoading || isDeveloperLoading || !user) {
            return;
        }

        if (isAdmin) {
            navigate("/dashboard");
            return;
        }

        if (isDeveloper) {
            navigate("/my-account/profile");
            return;
        }

        navigate("/my-account/profile");
    }, [loading, isAdminLoading, isDeveloperLoading, user, isAdmin, isDeveloper, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        logIn(email, password)
            .then(async () => {
                const jwtRes = await axiosPublic.post("/jwt", { email });
                localStorage.setItem('access-token', jwtRes.data.token);
                Swal.fire({
                    title: "Login Successfully!",
                    icon: "success",
                    draggable: true,
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: `${err.message}`,
                    icon: "error",
                    draggable: true,
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8" style={{ background: "#E6F0FF" }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl"
                style={{ background: "#F5FAFF" }}
            >
                {/* Floating Circle */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="
            absolute 
            -top-12 -right-12 
            sm:-top-16 sm:-right-16 
            md:-top-20 md:-right-20
            w-24 h-24 
            sm:w-32 sm:h-32 
            md:w-40 md:h-40 
            rounded-full 
            opacity-70 
            blur-3xl
          "
                    style={{ background: "linear-gradient(135deg, #2974FF, #1558D6)" }}
                />

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8" style={{ color: "#0F172A" }}>
                    Welcome to <span style={{ color: "#2974FF" }}>Codehido</span>
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 sm:mb-2" style={{ color: "#475569" }}>
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl focus:outline-none transition text-sm sm:text-base"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative flex items-center">
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl focus:outline-none transition text-sm sm:text-base"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 flex items-center justify-center h-full text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>


                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-lg sm:text-xl shadow-md transition"
                        style={{ background: "linear-gradient(90deg, #2974FF, #1558D6)", color: "#FFF" }}
                    >
                        Login
                    </motion.button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm sm:text-base mt-4 sm:mt-5" style={{ color: "#475569" }}>
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
