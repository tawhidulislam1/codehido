import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null); // Mobile submenu toggle
  const { user, logOut } = useAuth();

  // Logout
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

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
    {
      name: "More",
      children: [
        { name: "Career", url: "/career" },
        { name: "Testimonial", url: "/testimonial" },
        { name: "Portfolio", url: "/portfolio" },
        { name: "Teams", url: "/teams" },
      ],
    },
  ];

  return (
    <>
      {/* ======= NAVBAR START ======= */}
      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isSticky ? "bg-white shadow-md" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-gray-900">Code</span>
            <span className="text-[#2974FF]">hido</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-6 font-medium text-sm">
            {navLinks.map(({ name, url, children }) => (
              <li key={name} className="relative group">
                {children ? (
                  <>
                    {/* Parent */}
                    <button className="flex items-center gap-1 text-gray-900 hover:text-[#2974FF]">
                      {name}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.url}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm hover:bg-gray-100 ${isActive ? "text-[#2974FF]" : "text-gray-800"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `hover:text-[#2974FF] ${isActive ? "text-[#2974FF]" : "text-gray-900"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                )}
              </li>
            ))}

            {/* User Section */}
            <li>
              {user ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex cursor-pointer items-center gap-2 text-gray-900 hover:text-[#2974FF]"
                  >
                    <FaUserCircle className="text-2xl text-[#2974FF]" />
                  </button>

                  {showProfileMenu && (
                    <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md animate-fadeIn">
                      <li>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-900 hover:text-[#2974FF]"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-900"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo & Close */}
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-xl font-bold flex items-center"
            >
              <span className="text-gray-900">Code</span>
              <span className="text-[#2974FF]">hido</span>
            </Link>
            <button onClick={() => setMenuOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map(({ name, url, children }, index) => (
              <div key={name}>
                {children ? (
                  <>
                    {/* Parent menu button */}
                    <button
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === index ? null : index)
                      }
                      className="flex justify-between items-center py-2 w-full text-left text-gray-800 hover:text-[#2974FF]"
                    >
                      {name}
                      <svg
                        className={`w-4 h-4 transition-transform ${openSubMenu === index ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Submenu */}
                    {openSubMenu === index && (
                      <div className="flex flex-col ml-4 mt-1 gap-1">
                        {children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.url}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                              `text-sm py-1 hover:text-[#2974FF] ${isActive ? "text-[#2974FF]" : "text-gray-800"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={url}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-2 text-sm cursor-pointer hover:text-[#2974FF] ${isActive ? "text-[#2974FF]" : "text-gray-800"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile User Section */}
            <div className="mt-4 border-t pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <FaUserCircle className="text-2xl text-[#2974FF]" />
                    <span className="text-sm text-gray-900">
                      {user?.displayName || "User"}
                    </span>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-800 hover:text-[#2974FF]"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="block mt-2 text-sm text-red-500 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-900 hover:text-[#2974FF]"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
