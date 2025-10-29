import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaTrashAlt, FaUserShield, FaUserCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: users = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/user");
            return res.data;
        },
    });

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return; // safety check

        Swal.fire({
            title: "Are you sure?",
            text: `Change ${user.name}'s role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change Role!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .patch(`/user/role/${user._id}`, { role: newRole })  // send role in body
                    .then(() => {
                        Swal.fire("Success!", `${user.name} is now ${newRole}.`, "success");
                        refetch(); // refresh user list
                    })
                    .catch((err) => {
                        Swal.fire("Error!", `Failed to update role: ${err.message}`, "error");
                    });
            }
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
                axiosPublic.delete(`/user/${user._id}`).then(() => {
                    Swal.fire("Deleted!", "User has been removed.", "success");
                    refetch();
                });
            }
        });
    };

    // ========== UI States ==========
    if (isLoading)
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
                    All Users
                </h2>
                <p className="text-[#475569] text-sm mt-2 sm:mt-0">
                    Total Users:{" "}
                    <span className="font-bold text-[#2974FF]">{users.length}</span>
                </p>
            </div>

            {/* ======= Desktop Table ======= */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-md bg-white border border-[#E2E8F0]">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#E6F0FF] text-[#0F172A] uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Email</th>
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
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                            ? "bg-[#1558D6] text-white"
                                            : "bg-[#E6F0FF] text-[#0F172A]"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4">
                                        <div className="flex gap-2">
                                            {/* Admin */}
                                            <button
                                                onClick={() => handleRoleChange(user, "admin")}
                                                className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "admin"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-[#2974FF] hover:bg-[#1558D6]"
                                                    }`}
                                                disabled={user.role === "admin"}
                                                title="Make Admin"
                                            >
                                                Admin
                                            </button>

                                            {/* Developer */}
                                            <button
                                                onClick={() => handleRoleChange(user, "developer")}
                                                className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "developer"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-[#0F172A] hover:bg-[#475569]"
                                                    }`}
                                                disabled={user.role === "developer"}
                                                title="Make Developer"
                                            >
                                                Developer
                                            </button>

                                            {/* User */}
                                            <button
                                                onClick={() => handleRoleChange(user, "user")}
                                                className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "user"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-[#1558D6] hover:bg-[#2974FF]"
                                                    }`}
                                                disabled={user.role === "user"}
                                                title="Make User"
                                            >
                                                User
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                                            title="Delete User"
                                        >
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

                        <div className="flex justify-between items-center mt-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                    ? "bg-[#1558D6] text-white"
                                    : "bg-[#E6F0FF] text-[#0F172A]"
                                    }`}
                            >
                                {user.role}
                            </span>

                            <div className="flex gap-3">
                                <div className="flex gap-2">
                                    {/* Admin */}
                                    <button
                                        onClick={() => handleRoleChange(user, "admin")}
                                        className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "admin"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#2974FF] hover:bg-[#1558D6]"
                                            }`}
                                        disabled={user.role === "admin"}
                                        title="Make Admin"
                                    >
                                        Admin
                                    </button>

                                    {/* Developer */}
                                    <button
                                        onClick={() => handleRoleChange(user, "developer")}
                                        className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "developer"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#0F172A] hover:bg-[#475569]"
                                            }`}
                                        disabled={user.role === "developer"}
                                        title="Make Developer"
                                    >
                                        Developer
                                    </button>

                                    {/* User */}
                                    <button
                                        onClick={() => handleRoleChange(user, "user")}
                                        className={`px-2 py-1 rounded-lg text-white font-semibold transition-transform hover:scale-110 ${user.role === "user"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#1558D6] hover:bg-[#2974FF]"
                                            }`}
                                        disabled={user.role === "user"}
                                        title="Make User"
                                    >
                                        User
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleDelete(user)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-700 transition"
                                >
                                    Delete
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
