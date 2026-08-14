import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function EditService() {
    const { _id, title, description, image, status } = useLoaderData();

    const [formData, setFormData] = useState({
        title: title || "",
        description: description || "",
        image: image || "",
        status: status || "inactive",
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
            const result = await axiosSecure.put(`/dashboard/service/${_id}`, formData);
            console.log("✅ Service Updated:", result.data);
            Swal.fire({
                title: "Service updated successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/dashboard/service");
        } catch (error) {
            console.error("❌ Error updating service:", error);
            Swal.fire({ title: "Failed to update service. Please try again.", icon: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-100 overflow-y-auto"
            >
                <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                    Edit Service
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Service Info</h3>

                        <input
                            type="text"
                            placeholder="Service Title *"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Description</h3>

                        <textarea
                            placeholder="Write service details or features... *"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none h-32 resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Status</h3>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/service")}
                            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                        >
                            Update Service
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
