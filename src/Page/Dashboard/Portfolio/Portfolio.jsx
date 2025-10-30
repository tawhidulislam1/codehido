/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialProjects = [
    { id: 1, name: "Fama Barber Shop", description: "Landing page built with React, Tailwind & Firebase.", status: "Active", link: "#" },
    { id: 2, name: "Donation Hub", description: "Dynamic web app for managing charitable donations.", status: "Active", link: "#" },
    { id: 3, name: "Smart Parking", description: "IoT-enabled parking management dashboard.", status: "Inactive", link: "#" },
    { id: 4, name: "Roktho Bondhon", description: "Blood donation platform with real-time updates.", status: "Active", link: "#" },
];

export default function AdminPortfolio() {
    const [projects, setProjects] = useState(initialProjects);
    const [userRole] = useState("admin");
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (userRole !== "admin") return alert("Only admin can delete projects!");
        setProjects(projects.filter((p) => p.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-6 py-12">
            {/* HEADER */}
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                <motion.h1
                    className="text-4xl font-bold text-blue-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Admin Portfolio Dashboard
                </motion.h1>

                {userRole === "admin" && (
                    <button
                        onClick={() => navigate("/dashboard/add-porfolio")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer"
                    >
                        <FaPlus /> Add Project
                    </button>
                )}
            </header>

            {/* PROJECT TABLE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200"
            >
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-100 text-blue-900 uppercase text-sm font-semibold">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Project Name</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p, index) => (
                            <tr
                                key={p.id}
                                className={`border-t border-gray-200 hover:bg-blue-50 transition-all ${p.status === "Inactive" ? "opacity-70" : ""
                                    }`}
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">{p.name}</td>
                                <td className="px-6 py-4">{p.description}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={p.status}
                                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                                        className={`px-3 py-1 rounded-lg border text-sm font-medium ${p.status === "Active"
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-red-100 text-red-700 border-red-300"
                                            }`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4 text-lg">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => alert("Edit functionality coming soon!")}
                                        >
                                            <FaEdit />
                                        </button>
                                        {userRole === "admin" && (
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
