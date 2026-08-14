/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";

export default function BlogList() {
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();

    const { data: blogs = [], isPending: isBlogLoading, refetch } = useQuery({
        queryKey: ['blogs-dashboard'],
        queryFn: async () => {
            const res = await AxiosSecure.get('/dashboard/blog');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        if (!isAdmin) return Swal.fire({ title: "Only admin can delete blogs!", icon: "error" });

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this blog post.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosSecure.delete(`/dashboard/blog/${id}`);
                refetch();
            }
        });
    };

    const handleStatusChange = (id, status) => {
        AxiosSecure.patch(`/dashboard/blog/${id}`, { status })
            .then((res) => {
                if (res.data.modifiedCount > 0 || res.data.updatedBlog) {
                    Swal.fire({
                        title: "Status Updated!",
                        text: `Blog is now ${status}`,
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire({ title: "Failed to update blog status.", icon: "error" });
            });
    };

    if (isBlogLoading) {
        return <p className="text-center text-gray-600 py-10">Loading blogs...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-4 sm:px-6 py-8 sm:py-12">
            <header className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mb-10 text-center sm:text-left">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-blue-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Admin Blog Dashboard
                </motion.h1>

                <button
                    onClick={() => navigate("/dashboard/add-blog")}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <FaPlus /> Add Blog
                </button>
            </header>

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
                            <th className="px-4 sm:px-6 py-3">Title</th>
                            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Preview</th>
                            <th className="px-4 sm:px-6 py-3">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr
                                key={blog._id}
                                className={`border-t border-gray-200 hover:bg-blue-50 transition-all ${blog.status === "draft" ? "opacity-70" : ""}`}
                            >
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-4 sm:px-6 py-4 font-medium">{blog.title}</td>
                                <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{blog.content?.slice(0, 80) || "-"}</td>
                                <td className="px-4 sm:px-6 py-4">
                                    <select
                                        value={blog.status || "draft"}
                                        disabled={!isAdmin}
                                        onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                                        className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${blog.status === "published"
                                            ? "bg-green-100 text-green-800 border-green-300"
                                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                                            } ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4 text-lg">
                                        <button
                                            className="text-green-500 cursor-pointer hover:text-green-700"
                                            onClick={() => navigate(`/blog/${blog._id}`)}
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                                            onClick={() => navigate(`/dashboard/edit-blog/${blog._id}`)}
                                        >
                                            <FaEdit />
                                        </button>

                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="text-red-500 cursor-pointer hover:text-red-700"
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
