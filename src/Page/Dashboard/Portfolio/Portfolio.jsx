/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAdmin from "../../../Hooks/useAdmin";

export default function AdminPortfolio() {
    const [isAdmin] = useAdmin()
    const navigate = useNavigate();
    const AxiosPublic = useAxiosPublic();
    console.log(isAdmin);
    const { data: projects = [], isPending: isProjectLoading, refetch } = useQuery({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/dashboard/portfolio');
            return res.data;
        },
    });

    console.log(projects);
    const handleDelete = async (id) => {
        if (!isAdmin) return alert("Only admin can delete projects!");
        if (!confirm("Are you sure you want to delete this project?")) return;
        await AxiosPublic.delete(`/dashboard/portfolio/${id}`);
        refetch();
    };

    const handleStatusChange = (id, status) => {
        AxiosPublic.patch(`/dashboard/portfolio/${id}`, { status: status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Status Updated!",
                        text: `Your portfolio Is ${status}`,
                        icon: "success",
                    });
                    refetch();
                }
            });
    };

    if (isProjectLoading) {
        return <p className="text-center text-gray-600 py-10">Loading projects...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-4 sm:px-6 py-8 sm:py-12">
            {/* HEADER */}
            <header className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mb-10 text-center sm:text-left">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-blue-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Admin Portfolio Dashboard
                </motion.h1>


                <button
                    onClick={() => navigate("/dashboard/add-portfolio")}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <FaPlus /> Add Project
                </button>

            </header>

            {/* PROJECT TABLE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200"
            >
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-blue-100 text-blue-900 uppercase text-xs sm:text-sm font-semibold">
                        <tr>
                            <th className="px-4 sm:px-6 py-3">#</th>
                            <th className="px-4 sm:px-6 py-3">Project Name</th>
                            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Description</th>
                            <th className="px-4 sm:px-6 py-3">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p, index) => (
                            <tr
                                key={p._id}
                                className={`border-t border-gray-200 hover:bg-blue-50 transition-all ${p.status === "Inactive" ? "opacity-70" : ""}`}
                            >
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-4 sm:px-6 py-4 font-medium">{p.name}</td>
                                <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{p.details}</td>
                                <select
                                    value={p.status}
                                    disabled={!isAdmin}
                                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                                    className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${p.status === "active"
                                        ? "bg-green-100 text-green-800 border-green-300"
                                        : "bg-red-100 text-red-700 border-red-300"
                                        } ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                <td className="px-4 sm:px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4 text-lg">

                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => navigate(`/dashboard/edit-portfolio/${p._id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(p._id)}
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
