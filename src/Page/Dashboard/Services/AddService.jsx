import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function AddService() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        status: "active",
    });

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            Swal.fire({ title: "⚠️ Please fill all required fields!", icon: "warning" });
            return;
        }

        try {
            const result = await axiosSecure.post("/dashboard/service", formData);
            console.log("✅ Service Added:", result.data);
            Swal.fire({
                title: "Service added successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/dashboard/service");
        } catch (error) {
            console.error("❌ Error adding service:", error);
            Swal.fire({ title: "Failed to add service. Please try again.", icon: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-100"
            >
                <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                    Add New Service
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Service Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter service title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Service Image (URL)
                        </label>
                        <input
                            type="text"
                            placeholder="Paste image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Write service details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none h-28"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/service")}
                            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Save Service
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
