import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Profile = () => {
    const { user, updateUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user) {
                await updateUser(name, photoURL);
                const res = await axiosSecure.patch(`/user/${user.uid}`, {
                    name,
                    photoURL,
                });

                if (res.data.modifiedCount > 0 || res.data.acknowledged) {
                    Swal.fire({
                        title: "Profile Updated!",
                        text: "Your profile has been updated successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            }
        } catch (error) {
            console.error("Profile update error:", error.message);
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
            });
        }
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
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 md:-top-20 md:-right-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full opacity-70 blur-3xl"
                    style={{ background: "linear-gradient(135deg, #2974FF, #1558D6)" }}
                />

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8" style={{ color: "#0F172A" }}>
                    Profile <span style={{ color: "#2974FF" }}>Settings</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                        <label className="block text-sm mb-1 sm:mb-2" style={{ color: "#475569" }}>
                            Name
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl focus:outline-none transition text-sm sm:text-base"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 sm:mb-2" style={{ color: "#475569" }}>
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl focus:outline-none transition text-sm sm:text-base bg-gray-100"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 sm:mb-2" style={{ color: "#475569" }}>
                            Photo URL
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl focus:outline-none transition text-sm sm:text-base"
                            style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-lg sm:text-xl shadow-md transition"
                        style={{ background: "linear-gradient(90deg, #2974FF, #1558D6)", color: "#FFF" }}
                    >
                        Save Changes
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
