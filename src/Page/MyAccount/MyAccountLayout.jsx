import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaRegCommentDots, FaEnvelope, FaDonate, FaKey } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

const accountLinks = [
  { label: "Profile", to: "/my-account/profile", icon: FaUserCircle },
  { label: "My Reviews", to: "/my-account/reviews", icon: FaRegCommentDots },
  { label: "My Messages", to: "/my-account/messages", icon: FaEnvelope },
  { label: "My Donations", to: "/my-account/donations", icon: FaDonate },
  { label: "Change Password", to: "/my-account/change-password", icon: FaKey },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
    ? "bg-[#2974FF] text-white shadow-md"
    : "text-[#F5FAFF] hover:bg-[#1558D6] hover:text-white"
  }`;

export default function MyAccountLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-[#E6F0FF] text-[#0F172A] overflow-hidden">
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <motion.aside
            key="my-account-sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed lg:static z-40 w-64 bg-gradient-to-b from-[#2974FF] to-[#1558D6] text-white flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#F5FAFF]/20">
              <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
                <FaUserCircle /> My Account
              </h2>
              {!isDesktop && (
                <button
                  className="text-white hover:text-[#F5FAFF]"
                  onClick={toggleSidebar}
                  aria-label="Close sidebar"
                >
                  <IoIosClose size={26} />
                </button>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
              <ul className="space-y-2 text-sm">
                // eslint-disable-next-line no-unused-vars
                {accountLinks.map(({ label, to, icon: Icon }) => (
                  <li key={to}>
                    <NavLink to={to} className={navLinkClass}>
                      <Icon /> {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        {!isDesktop && (
          <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-[#2974FF] text-white px-4 py-3 shadow-lg z-30">
            <button onClick={toggleSidebar} aria-label="Open sidebar">
              <MdMenu size={24} />
            </button>
            <h2 className="text-lg font-semibold">My Account</h2>
            <div></div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 md:p-10 mt-14 lg:mt-0 bg-[#F5FAFF] rounded-t-3xl shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
