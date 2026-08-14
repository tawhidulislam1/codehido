import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useTableControls from "../../../Hooks/useTableControls";
import SearchInput from "../../../Commonents/SearchInput";
import FilterDropdown from "../../../Commonents/FilterDropdown";
import SortableHeader from "../../../Commonents/SortableHeader";
import PaginationControls from "../../../Commonents/PaginationControls";
import ViewDetailsButton from "../../../Commonents/ViewDetailsButton";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [updatingUserId, setUpdatingUserId] = useState(null);
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

    const {
        data,
        isPending,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ["allUsers", user?.email, search, filterValue, sort, page, limit],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/user", {
                params: {
                    search: search || undefined,
                    role: filterValue === "all" ? undefined : filterValue,
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
                        : res.data?.result || res.data?.users || [],
                totalCount: Number(res.data?.totalCount ?? res.data?.count ?? 0),
                totalPages: Number(
                    res.data?.totalPages ??
                    Math.max(1, Math.ceil((res.data?.totalCount ?? res.data?.count ?? 0) / limit))
                ),
            };
        },
    });

    const users = data?.data ?? [];
    const totalCount = data?.totalCount ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const isLoading = isPending || isFetching;

    const toggleSort = (field) => {
        setSort((current) => {
            if (current === field) return `-${field}`;
            if (current === `-${field}`) return "";
            return field;
        });
    };

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole || updatingUserId === user._id) return;

        Swal.fire({
            title: "Are you sure?",
            text: `Change ${user.name}'s role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change Role!",
        }).then((result) => {
            if (!result.isConfirmed) return;

            setUpdatingUserId(user._id);
            axiosSecure
                .patch(`/user/role/${user._id}`, { role: newRole })
                .then(() => {
                    Swal.fire("Success!", `${user.name} is now ${newRole}.`, "success");
                    refetch();
                })
                .catch((err) => {
                    Swal.fire("Error!", `Failed to update role: ${err.message}`, "error");
                })
                .finally(() => {
                    setUpdatingUserId(null);
                });
        });
    };
    // ========== Delete User ==========
    const handleDelete = (user) => {
        Swal.fire({
            title: "Delete User?",
            text: `You are about to delete ${user.name}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${user._id}`).then(() => {
                    Swal.fire("Deleted!", "User has been removed.", "success");
                    refetch();
                });
            }
        });
    };

    // ========== UI States ==========
    if (isPending && users.length === 0)
        return (
            <div className="flex justify-center items-center h-64 text-[#2974FF] font-semibold animate-pulse">
                Loading users...
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-500 font-semibold mt-10">
                ❌ Failed to load users. Please try again later.
            </div>
        );

    if (users.length === 0)
        return (
            <div className="flex flex-col items-center justify-center h-64 text-[#475569]">
                <FaUserCircle size={48} className="text-[#CBD5E1] mb-3" />
                <p className="text-lg font-medium">No users found</p>
            </div>
        );

    // ========== Main UI ==========
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 bg-[#F5FAFF] rounded-2xl shadow-xl border border-[#E6F0FF]"
        >
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
                        All Users
                    </h2>
                    <p className="text-[#475569] text-sm mt-2 sm:mt-0">
                        Total Users:{" "}
                        <span className="font-bold text-[#2974FF]">{totalCount || users.length}</span>
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name or email"
                    />

                    <FilterDropdown
                        label="Role"
                        value={filterValue}
                        onChange={setFilterValue}
                        options={[
                            { value: "all", label: "All" },
                            { value: "user", label: "User" },
                            { value: "admin", label: "Admin" },
                            { value: "developer", label: "Developer" },
                        ]}
                    />
                </div>

                {isLoading && (
                    <div className="text-sm text-[#2974FF] font-medium animate-pulse">
                        Refreshing user list...
                    </div>
                )}
            </div>

            {/* ======= Desktop Table ======= */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-md bg-white border border-[#E2E8F0]">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#E6F0FF] text-[#0F172A] uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">
                                <SortableHeader
                                    label="User"
                                    active={sort === "name" || sort === "-name"}
                                    direction={sort === "-name" ? "desc" : "asc"}
                                    onClick={() => toggleSort("name")}
                                />
                            </th>
                            <th className="px-6 py-4">
                                <SortableHeader
                                    label="Email"
                                    active={sort === "email" || sort === "-email"}
                                    direction={sort === "-email" ? "desc" : "asc"}
                                    onClick={() => toggleSort("email")}
                                />
                            </th>
                            <th className="px-6 py-4 text-center">Role</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <motion.tr
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b hover:bg-[#F8FAFC] transition-all duration-200"
                            >
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="w-15 h-15 rounded-full border border-[#E2E8F0] object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-[#0F172A]">{user.name}</p>
                                        <p className="text-xs text-[#64748B]">
                                            {user.email.split("@")[0]}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#475569]">{user.email}</td>
                                <td className="px-6 py-4 text-center">
                                    <select
                                        value={user.role || "user"}
                                        onChange={(e) => handleRoleChange(user, e.target.value)}
                                        disabled={updatingUserId === user._id}
                                        className={`min-w-[130px] rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                            user.role === "admin"
                                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                                : user.role === "developer"
                                                    ? "border-slate-200 bg-slate-100 text-slate-700"
                                                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        } ${updatingUserId === user._id ? "cursor-not-allowed opacity-70" : ""}`}
                                        aria-label={`Update role for ${user.name}`}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="developer">Developer</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <ViewDetailsButton
                                            to={`/dashboard/users/${user._id}`}
                                            className="h-9 w-9 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(user)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                                            title="Delete User"
                                            aria-label="Delete User"
                                        >
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={(nextPage) => setPage(Math.min(Math.max(nextPage, 1), totalPages))}
            />

            {/* ======= Mobile Cards ======= */}
            <div className="md:hidden grid gap-4 mt-6">
                {users.map((user, index) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white p-4 rounded-xl shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={user.photoURL || "https://i.ibb.co/5hfdRQv3/my-photo.jpg"}
                                alt={user.name}
                                className="w-12 h-12 rounded-full border object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-[#0F172A]">{user.name}</h3>
                                <p className="text-sm text-[#475569]">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 gap-3">
                            <select
                                value={user.role || "user"}
                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                disabled={updatingUserId === user._id}
                                className={`min-w-[120px] rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                    user.role === "admin"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : user.role === "developer"
                                            ? "border-slate-200 bg-slate-100 text-slate-700"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                } ${updatingUserId === user._id ? "cursor-not-allowed opacity-70" : ""}`}
                                aria-label={`Update role for ${user.name}`}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="developer">Developer</option>
                            </select>

                            <div className="flex items-center gap-2">
                                <ViewDetailsButton
                                    to={`/dashboard/users/${user._id}`}
                                    className="h-9 w-9 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDelete(user)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                                    title="Delete User"
                                    aria-label="Delete User"
                                >
                                    <FaTrashAlt size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AllUsers;
