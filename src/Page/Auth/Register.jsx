/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imageHostingKey = import.meta.env.VITE_IMAGE_API;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const { createUser, updateUser } = useAuth();
  const axiosPublic = useAxosPublic();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      Swal.fire("Please upload a photo before registering!");
      return;
    }

    try {
      // Step 1: Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", photo);

      const imageRes = await axios.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imageRes.data.success) {
        const photoURL = imageRes.data.data.display_url;
        console.log("Image uploaded:", photoURL);

        // Step 2: Create user in Firebase
        const res = await createUser(email, password);

        // Step 3: Update Firebase user profile
        await updateUser(name, photoURL);

        // Step 4: Save user info to your backend (optional)
        const userInfo = { name, email, photoURL };
        await axiosPublic.post("/user", userInfo);

        // Step 5: Success message
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire("Image upload failed. Please try again!");
      }
    } catch (error) {
      console.error("Registration Error:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "#E6F0FF" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl"
        style={{ background: "#F5FAFF" }}
      >
        {/* Floating Circle */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-16 -left-16 w-36 h-36 rounded-full opacity-70 blur-3xl"
          style={{ background: "linear-gradient(135deg, #2974FF, #1558D6)" }}
        ></motion.div>

        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#0F172A" }}
        >
          Create <span style={{ color: "#2974FF" }}>Codehido</span> Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#475569" }}>
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none transition"
              style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
            />
          </div>

          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#475569" }}>
              Profile Photo
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white"
              style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
            />
          </div>

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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none transition"
              style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
            />
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-lg shadow-md transition"
            style={{
              background: "linear-gradient(90deg, #2974FF, #1558D6)",
              color: "#FFF",
            }}
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-sm mt-5" style={{ color: "#475569" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2974FF", fontWeight: "500" }}>
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
