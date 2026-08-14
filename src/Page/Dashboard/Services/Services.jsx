/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";
import AdminActionsDropdown from "../../../Commonents/AdminActionsDropdown";

export default function Services() {
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();

    const { data: services = [], isPending: isServiceLoading, refetch } = useQuery({
        queryKey: ['services-dashboard'],
        queryFn: async () => {
            const res = await AxiosSecure.get('/dashboard/service');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        if (!isAdmin) return Swal.fire({ title: "Only admin can delete services!", icon: "error" });

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this service.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosSecure.delete(`/dashboard/service/${id}`);
                refetch();
            }
        });
    };

    const handleStatusChange = (id, status) => {
        AxiosSecure.patch(`/dashboard/service/${id}`, { status })
            .then((res) => {
                if (res.data.modifiedCount > 0 || res.data.updatedService) {
                    Swal.fire({
                        title: "Status Updated!",
                        text: `Service is now ${status}`,
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire({ title: "Failed to update status.", icon: "error" });
            });
    };

    if (isServiceLoading) {
        return <p className="text-center text-gray-600 py-10">Loading services...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-4 sm:px-6 py-8 sm:py-12">
            <header className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mb-10 text-center sm:text-left">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-blue-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Admin Service Dashboard
                </motion.h1>

                <button
                    onClick={() => navigate("/dashboard/add-service")}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <FaPlus /> Add Service
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
                            <th className="px-4 sm:px-6 py-3">Service Name</th>
                            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Description</th>
                            <th className="px-4 sm:px-6 py-3">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr
                                key={service._id}
                                className={`border-t border-gray-200 hover:bg-blue-50 transition-all ${service.status === "inactive" ? "opacity-70" : ""}`}
                            >
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-4 sm:px-6 py-4 font-medium">{service.title}</td>
                                <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{service.description?.slice(0, 80) || "-"}</td>
                                <td className="px-4 sm:px-6 py-4">
                                    <select
                                        value={service.status || "inactive"}
                                        disabled={!isAdmin}
                                        onChange={(e) => handleStatusChange(service._id, e.target.value)}
                                        className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${service.status === "active"
                                            ? "bg-green-100 text-green-800 border-green-300"
                                            : "bg-red-100 text-red-700 border-red-300"
                                            } ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-center">
                                    <AdminActionsDropdown
                                        actions={[
                                            {
                                                key: "view",
                                                label: "View Details",
                                                onClick: () => navigate(`/dashboard/service/${service._id}`),
                                            },
                                            {
                                                key: "edit",
                                                label: "Edit",
                                                onClick: () => navigate(`/dashboard/edit-service/${service._id}`),
                                            },
                                            ...(isAdmin
                                                ? [
                                                    { type: "divider" },
                                                    { key: "delete", label: "Delete", danger: true, onClick: () => handleDelete(service._id) },
                                                ]
                                                : []),
                                        ]}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
