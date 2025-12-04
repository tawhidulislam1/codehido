import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAdmin from "../../../Hooks/useAdmin";

export default function EditPortfolio() {
    const [formData, setFormData] = useState({
        name: "",
        technology: "",
        designedBy: "",
        image: "",
        github: "",
        server: "",
        live: "",
        details: "",
        status: 'inactive',
    });
    const [isAdmin] = useAdmin();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const payload = {
        ...formData,
        status: isAdmin ? 'active' : 'inactive',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.technology || !formData.details) {
            alert("⚠️ Please fill all required fields!");
            return;
        }

        try {
            const result = await axiosPublic.post("/dashboard/portfolio", payload);
            console.log("✅ New Project Added:", result.data);
            alert("Project added successfully!");
            navigate("/dashboard/portfolio");
        } catch (error) {
            console.error("❌ Error adding project:", error);
            alert("Failed to add project. Please try again.");
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
                    Add / Edit Project
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                    {/* Project Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Project Info</h3>

                        <input
                            type="text"
                            placeholder="Project Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Technology Used *"
                            value={formData.technology}
                            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Designed By"
                            value={formData.designedBy}
                            onChange={(e) => setFormData({ ...formData, designedBy: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Links Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Project Links</h3>

                        <input
                            type="text"
                            placeholder="GitHub Link"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Server Link"
                            value={formData.server}
                            onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Live Project Link"
                            value={formData.live}
                            onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Project Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        {/* Image Preview */}
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

                    {/* Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Project Details</h3>

                        <textarea
                            placeholder="Write project details or features... *"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none h-32 resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/portfolio")}
                            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                        >
                            Save Project
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
