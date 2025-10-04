import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------------- HANDLE SCROLL FOR STICKY NAV ----------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsSticky(scrollY > viewportHeight * 0.08); // slightly early sticky
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ---------------- NAV LINKS ----------------
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
    { name: "Login", url: "/login" },
  ];

  return (
    <>
      {/* ---------------- STICKY DESKTOP NAVBAR ---------------- */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 font-medium text-sm ${
          isSticky ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-gray-900">Code</span>
            <span style={{ color: "#2974FF" }}>hido</span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ name, url, children }) => (
              <li key={name} className="relative group">
                {children ? (
                  <>
                    {/* Parent */}
                    <button className="flex items-center gap-1 text-gray-900 hover:text-[#2974FF] transition-colors duration-300">
                      {name}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <ul className="absolute left-0 top-full mt-2 min-w-[160px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.url}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm hover:text-[#2974FF] hover:bg-gray-100 ${
                                isActive ? "text-[#2974FF]" : "text-gray-800"
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
                      `text-gray-900 hover:text-[#2974FF] transition duration-300 ${
                        isActive ? "text-[#2974FF]" : ""
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* MOBILE MENU TOGGLE */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-gray-900">
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------- MOBILE OVERLAY ---------------- */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ---------------- MOBILE SLIDE MENU ---------------- */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo & Close */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-bold flex items-center">
              <span className="text-gray-900">Code</span>
              <span style={{ color: "#2974FF" }}>hido</span>
            </Link>
            <button onClick={toggleMenu} className="text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MOBILE LINKS */}
          <nav className="flex flex-col gap-4 text-gray-800 text-base">
            {navLinks.map(({ name, url, children }) => (
              <div key={name}>
                {children ? (
                  <details className="group">
                    <summary className="cursor-pointer flex justify-between items-center text-sm py-2 hover:text-[#2974FF]">
                      {name}
                      <svg
                        className="w-4 h-4 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="flex flex-col ml-4 mt-2 gap-2">
                      {children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.url}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `text-sm py-1 hover:text-[#2974FF] transition duration-200 ${
                              isActive ? "text-[#2974FF]" : "text-gray-800"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  </details>
                ) : (
                  <NavLink
                    to={url}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `hover:text-[#2974FF] transition duration-200 cursor-pointer text-sm py-2 ${
                        isActive ? "text-[#2974FF]" : "text-gray-800"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
