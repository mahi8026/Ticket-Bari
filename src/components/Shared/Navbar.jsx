import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBus,
  FaUser,
  FaTicketAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaTachometerAlt,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBlog,
  FaQuestionCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileDropdownOpen(false);
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  // Navigation items for logged out users (minimum 3)
  const publicNavItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "All Tickets", path: "/tickets", icon: FaTicketAlt },
    { name: "About", path: "/about", icon: FaInfoCircle },
    { name: "Contact", path: "/contact", icon: FaEnvelope },
    { name: "Blog", path: "/blog", icon: FaBlog },
  ];

  // Navigation items for logged in users (minimum 5)
  const authenticatedNavItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "All Tickets", path: "/tickets", icon: FaTicketAlt },
    { name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { name: "About", path: "/about", icon: FaInfoCircle },
    { name: "Contact", path: "/contact", icon: FaEnvelope },
    { name: "Blog", path: "/blog", icon: FaBlog },
    { name: "Help", path: "/help", icon: FaQuestionCircle },
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-3xl border-b border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/10"
          : "bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5"
      } before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:pointer-events-none`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary/80 transition-all duration-300 relative group"
              onClick={closeMenus}
            >
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <FaBus className="text-2xl relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="hidden sm:block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                TicketBari
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      isActivePath(item.path)
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 backdrop-blur-sm shadow-lg shadow-primary/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/30 hover:text-primary backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-gray-700/30"
                    }`}
                  >
                    <Icon className="text-sm relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                    {!isActivePath(item.path) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-gray-700/30 relative group"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <FaSun className="text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <FaMoon className="text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-gray-700/30 relative group"
                  aria-label="User menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-semibold shadow-lg relative z-10"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                      />
                    ) : (
                      user.displayName?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"
                    )}
                  </motion.div>
                  <div className="hidden md:block text-left relative z-10">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.displayName || "User"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {role || "Loading..."}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <FaChevronDown className="text-xs text-gray-500" />
                  </motion.div>
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 py-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                      <div className="px-4 py-3 border-b border-white/20 dark:border-gray-700/20 relative z-10">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.displayName || "User"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                        <div className="text-xs text-primary font-medium capitalize mt-1">
                          {role} Account
                        </div>
                      </div>

                      <motion.div
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="relative z-10"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-200"
                          onClick={closeMenus}
                        >
                          <FaTachometerAlt />
                          <span>Dashboard</span>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="relative z-10"
                      >
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-200"
                          onClick={closeMenus}
                        >
                          <FaUser />
                          <span>Profile</span>
                        </Link>
                      </motion.div>

                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(239, 68, 68, 0.2)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all duration-200 relative z-10"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-all duration-300 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/20 backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="btn-primary-custom text-sm relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/20"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-gray-700/30 relative group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <FaTimes className="text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <FaBars className="text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden border-t border-white/20 dark:border-gray-700/20 bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="px-4 py-4 space-y-2 relative z-10">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      variants={menuItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                          isActivePath(item.path)
                            ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 backdrop-blur-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-gray-700/30"
                        }`}
                        onClick={closeMenus}
                      >
                        <Icon className="text-lg relative z-10" />
                        <span className="relative z-10">{item.name}</span>
                        {!isActivePath(item.path) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {!user && (
                  <motion.div
                    variants={menuItemVariants}
                    className="pt-4 border-t border-white/20 dark:border-gray-700/20 space-y-2"
                  >
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/login"
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-600/30 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 backdrop-blur-sm"
                        onClick={closeMenus}
                      >
                        Sign In
                      </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/register"
                        className="flex items-center justify-center w-full btn-primary-custom text-sm bg-gradient-to-r from-primary to-primary/80 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/20 relative overflow-hidden group"
                        onClick={closeMenus}
                      >
                        <span className="relative z-10">Sign Up</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {(isMenuOpen || isProfileDropdownOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMenus}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
