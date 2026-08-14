/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaEye, FaGripVertical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import useAdmin from "../../../Hooks/useAdmin";
import useTableControls from "../../../Hooks/useTableControls";
import SearchInput from "../../../Commonents/SearchInput";
import FilterDropdown from "../../../Commonents/FilterDropdown";
import SortableHeader from "../../../Commonents/SortableHeader";
import PaginationControls from "../../../Commonents/PaginationControls";

function SortableProjectRow({ project, index, isAdmin, handleDelete, navigate, handleStatusChange }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className={`border-t border-gray-200 hover:bg-blue-50 transition-all ${project.status === "Inactive" ? "opacity-70" : ""}`}
        >
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-blue-600"
                        aria-label={`Reorder ${project.name}`}
                    >
                        <FaGripVertical />
                    </button>
                    {index + 1}
                </div>
            </td>
            <td className="px-4 sm:px-6 py-4 font-medium">{project.name}</td>
            <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{project.designedBy}</td>
            <td className="px-4 sm:px-6 py-4 md:table-cell">
                <select
                    value={project.status}
                    disabled={!isAdmin}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                    className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${project.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                        } ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </td>
            <td className="px-4 sm:px-6 py-4 text-center">
                <div className="flex justify-center gap-4 text-lg">
                    <button
                        className="text-green-500 cursor-pointer hover:text-green-700"
                        onClick={() => navigate(`/portfolio/${project._id}`)}
                    >
                        <FaEye />
                    </button>

                    <button
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => navigate(`/dashboard/edit-portfolio/${project._id}`)}
                    >
                        <FaEdit />
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => handleDelete(project._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default function AdminPortfolio() {
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const {
        search,
        setSearch,
        filterValue,
        setFilterValue,
        sort,
        setSort,
        page,
        setPage,
        limit,
    } = useTableControls({ defaultLimit: 10 });

    const { data, isPending, isFetching, refetch } = useQuery({
        queryKey: ["portfolio", search, filterValue, sort, page, limit],
        queryFn: async () => {
            const res = await AxiosSecure.get("/dashboard/portfolio", {
                params: {
                    search: search || undefined,
                    status: filterValue === "all" ? undefined : filterValue,
                    sort: sort || undefined,
                    page,
                    limit,
                },
            });

            return {
                data: Array.isArray(res.data?.data)
                    ? res.data.data
                    : Array.isArray(res.data)
                        ? res.data
                        : res.data?.result || [],
                totalCount: Number(res.data?.totalCount ?? 0),
                totalPages: Number(res.data?.totalPages ?? 1),
            };
        },
    });

    const [projectsList, setProjectsList] = useState([]);
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    useEffect(() => {
        setProjectsList(data?.data ?? []);
    }, [data]);

    const projects = projectsList.length ? projectsList : (data?.data ?? []);
    const totalPages = data?.totalPages ?? 1;
    const isProjectLoading = isPending || isFetching;

    const toggleSort = (field) => {
        setSort((current) => {
            if (current === field) return `-${field}`;
            if (current === `-${field}`) return "";
            return field;
        });
    };
    const handleDelete = async (id) => {
        if (!isAdmin) return Swal.fire({ title: "Only admin can delete projects!", icon: "error" });
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this project.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosSecure.delete(`/dashboard/portfolio/${id}`);
                refetch();
            }
        });
    };

    const handleStatusChange = (id, status) => {
        AxiosSecure.patch(`/dashboard/portfolio/${id}`, { status: status })
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

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const previousOrder = [...projects];
        const oldIndex = previousOrder.findIndex((item) => item._id === active.id);
        const newIndex = previousOrder.findIndex((item) => item._id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const reordered = arrayMove(previousOrder, oldIndex, newIndex);
        setProjectsList(reordered);

        try {
            await AxiosSecure.patch("/dashboard/portfolio/reorder", {
                items: reordered.map((item, index) => ({
                    id: item._id,
                    order: index + 1,
                })),
            });

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        } catch (error) {
            setProjectsList(previousOrder);
            Swal.fire({
                title: "Reorder failed",
                text: error?.response?.data?.message || "Could not save the new portfolio order.",
                icon: "error",
            });
        }
    };

    if (isPending && projects.length === 0) {
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

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by project title"
                />

                <FilterDropdown
                    label="Status"
                    value={filterValue}
                    onChange={setFilterValue}
                    options={[
                        { value: "all", label: "All" },
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                />
            </div>

            {isProjectLoading && (
                <div className="max-w-6xl mx-auto text-sm text-blue-600 font-medium mb-4 animate-pulse">
                    Refreshing projects...
                </div>
            )}

            {/* PROJECT TABLE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200"
            >
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={projects.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-blue-100 text-blue-900 uppercase text-xs sm:text-sm font-semibold">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3">#</th>
                                    <th className="px-4 sm:px-6 py-3">
                                        <SortableHeader
                                            label="Project Name"
                                            active={sort === "name" || sort === "-name"}
                                            direction={sort === "-name" ? "desc" : "asc"}
                                            onClick={() => toggleSort("name")}
                                        />
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Developer</th>
                                    <th className="px-4 sm:px-6 py-3">Status</th>
                                    <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((p, index) => (
                                    <SortableProjectRow
                                        key={p._id}
                                        project={p}
                                        index={index}
                                        isAdmin={isAdmin}
                                        handleDelete={handleDelete}
                                        navigate={navigate}
                                        handleStatusChange={handleStatusChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </SortableContext>
                </DndContext>
            </motion.div>

            <div className="max-w-6xl mx-auto mt-6">
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(nextPage) => setPage(Math.min(Math.max(nextPage, 1), totalPages))}
                />
            </div>
        </div>
    );
}
