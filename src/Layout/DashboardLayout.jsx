import { useState } from "react";
import {
    FaHome,
    FaUsers,
    FaClipboardList,
    FaRegCommentDots,
    FaBlog,
    FaPlusCircle,
    FaUserCircle,
    FaSearch,
    FaAd,
} from "react-icons/fa";
import { MdMenu, MdOutlineDesignServices, MdOutlinePeople } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { BiBookContent, BiSolidDashboard } from "react-icons/bi";
import { NavLink, Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
    const { logOut } = useAuth()
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "You are logged out now!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.error("Logout failed:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Logout failed!",
                            text: error.message,
                        });
                    });
            }
        });
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
            ? "bg-[#2974FF] text-white shadow-md"
            : "text-[#F5FAFF] hover:bg-[#1558D6] hover:text-white"
        }`;

    return (
        <div className="flex min-h-screen bg-[#E6F0FF] text-[#0F172A]">
            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || window.innerWidth >= 640) && (
                    <motion.aside
                        key="sidebar"
                        initial={{ x: -250, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -250, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed sm:static z-40 w-64 h-full bg-gradient-to-b from-[#2974FF] to-[#1558D6] text-white flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#F5FAFF]/20">
                            <h2 className="text-2xl font-bold tracking-wide flex items-center gap-2">
                                <BiSolidDashboard /> Admin Panel
                            </h2>
                            <button
                                className="sm:hidden text-white hover:text-[#F5FAFF]"
                                onClick={toggleSidebar}
                            >
                                <IoIosClose size={26} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <NavLink to="/dashboard/dashboard" className={navLinkClass}>
                                        <FaHome /> Dashboard Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/add-portfolio"
                                        className={navLinkClass}
                                    >
                                        <FaPlusCircle /> Add Portfolio
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/add-service" className={navLinkClass}>
                                        <MdOutlineDesignServices /> Add Service
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/add-team-member"
                                        className={navLinkClass}
                                    >
                                        <MdOutlinePeople /> Add Team Member
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/reviews" className={navLinkClass}>
                                        <FaRegCommentDots /> Review List
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/add-blog" className={navLinkClass}>
                                        <FaBlog /> Add Blog
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/content-management"
                                        className={navLinkClass}
                                    >
                                        <BiBookContent /> Content Management
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/users" className={navLinkClass}>
                                        <FaUsers /> Manage Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/profile" className={navLinkClass}>
                                        <FaUserCircle /> Admin Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-[#F5FAFF] hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                                    >
                                        <IoIosClose size={20} />
                                        Logout
                                    </button>
                                </li>


                                {/* Divider */}
                                <hr className="my-3 border-[#F5FAFF]/20" />

                                {/* Public Links */}
                                <li>
                                    <NavLink to="/" className={navLinkClass}>
                                        <FaHome /> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/search" className={navLinkClass}>
                                        <FaSearch /> Search
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog" className={navLinkClass}>
                                        <FaBlog /> Blog
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/donation-request" className={navLinkClass}>
                                        <FaAd /> Donation Request
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        {/* Footer */}
                        <div className="text-xs text-center p-3 border-t border-[#F5FAFF]/20 opacity-70">
                            © {new Date().getFullYear()} Codehido Admin
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen sm:ml-64 transition-all">
                {/* Mobile Topbar */}
                <div className="sm:hidden fixed top-0 left-0 w-full flex items-center justify-between bg-[#2974FF] text-white px-4 py-3 shadow-lg z-30">
                    <button onClick={toggleSidebar}>
                        <MdMenu size={24} />
                    </button>
                    <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                    <div></div>
                </div>

                <main className="flex-1 p-6 sm:p-10 mt-14 sm:mt-0 bg-[#F5FAFF] rounded-t-3xl shadow-inner overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
