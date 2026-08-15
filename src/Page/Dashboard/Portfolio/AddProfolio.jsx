import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";
import useDeveloper from "../../../Hooks/useDeveloper";
import Swal from "sweetalert2";
import ImageUpload from "../../../Commonents/ImageUpload";

export default function AddProject() {
    const [formData, setFormData] = useState({
        name: "",
        technology: "",
        designedBy: "",
        image: "",
        github: "",
        server: "",
        live: "",
        details: "",
        status: 'active',
    });
    const [imageUrl, setImageUrl] = useState("");
    const [isAdmin] = useAdmin();
    const [isDeveloper] = useDeveloper();
    const isDeveloperRole = !isAdmin && Boolean(isDeveloper);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const payload = {
        ...formData,
        image: imageUrl,
        status: isAdmin ? formData.status : 'inactive',
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.technology || !formData.details) {
            Swal.fire({ title: "⚠️ Please fill all required fields!", icon: "warning" });
            return;
        }


        try {
            const result = await axiosSecure.post("/dashboard/portfolio", payload);
            console.log("✅ New Project Added:", result.data);
            Swal.fire({
                title: "Project added successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/dashboard/portfolio");
        } catch (error) {
            console.error("❌ Error adding project:", error);
            Swal.fire({ title: "Failed to add project. Please try again.", icon: "error" });
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
                    Add New Project
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Project Name */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Project Technology */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Project Technology <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. React, Tailwind, Firebase"
                            value={formData.technology}
                            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Designed By */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Designed By
                        </label>
                        <input
                            type="text"
                            placeholder="Designer or developer name"
                            value={formData.designedBy}
                            onChange={(e) => setFormData({ ...formData, designedBy: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Project Image
                        </label>
                        <ImageUpload onUploaded={setImageUrl} />
                    </div>

                    {/* GitHub Link */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            GitHub Link
                        </label>
                        <input
                            type="text"
                            placeholder="https://github.com/username/project"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Server Link */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Server Link
                        </label>
                        <input
                            type="text"
                            placeholder="https://api.myproject.com"
                            value={formData.server}
                            onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Live Link */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Live Website Link
                        </label>
                        <input
                            type="text"
                            placeholder="https://myproject.vercel.app"
                            value={formData.live}
                            onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Project Details */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Project Details <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Write project details or features..."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none h-28"
                        />
                    </div>

                    {isDeveloperRole && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                            Your submission will be reviewed by admin before going live
                        </div>
                    )}

                    {!isDeveloperRole && (
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
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Save Project
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
