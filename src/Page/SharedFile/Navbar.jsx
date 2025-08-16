import { useEffect, useState } from "react";
import Sticky from "react-stickynode";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsSticky(scrollY > viewportHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <>
      <Sticky
        enabled={true}
        className={`w-full z-50 transition-all duration-500 font-medium text-sm ${
          isSticky ? "fixed top-0 bg-white shadow-md" : "absolute top-0 bg-transparent"
        }`}
      >
        <div className="navbar max-w-7xl mx-auto px-4">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold transition-all duration-300">
              <span className={`${menuOpen ? "text-white lg:text-gray-900" : "text-gray-900"}`}>Code</span>
              <span style={{ color: "#2974FF" }}>hido</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="menu menu-horizontal hidden lg:flex gap-4">
            {navLinks.map(({ name, url }) => (
              <li key={name}>
                <NavLink
                  to={url}
                  className="text-gray-900 hover:text-[#2974FF] transition duration-300 text-sm"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className={`btn btn-ghost ${menuOpen ? "text-white" : "text-gray-900"}`}>
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Sticky>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <Sticky
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-bold">
              <span className="text-gray-900">Code</span>
              <span style={{ color: "#2974FF" }}>hido</span>
            </Link>
            <button onClick={toggleMenu} className="text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col gap-6 text-gray-800 text-base">
            {navLinks.map(({ name, url }) => (
              <Link
                key={name}
                to={url}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#2974FF] transition duration-200 cursor-pointer text-sm"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </Sticky>
    </>
  );
};

export default Navbar;
