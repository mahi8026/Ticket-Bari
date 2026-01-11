import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaUser,
  FaTicketAlt,
  FaChartBar,
  FaPlusCircle,
  FaHistory,
  FaBus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import React from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const DashboardLayout = () => {
  const { logOut, user } = useContext(AuthContext);
  const { role, isLoading } = useRole();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  let sidebarItems;

  if (role === "admin") {
    sidebarItems = [
      {
        to: "admin-profile",
        icon: FaTachometerAlt,
        label: "Admin Dashboard",
        color: "text-primary-600 dark:text-primary-400",
      },
      {
        to: "manage-tickets",
        icon: FaTicketAlt,
        label: "Manage Tickets",
        color: "text-secondary-600 dark:text-secondary-400",
      },
      {
        to: "manage-users",
        icon: FaUsers,
        label: "Manage Users",
        color: "text-success-600 dark:text-success-400",
      },
      {
        to: "advertise-tickets",
        icon: FaChartBar,
        label: "Advertise Tickets",
        color: "text-accent-600 dark:text-accent-400",
      },
    ];
  } else if (role === "vendor") {
    sidebarItems = [
      {
        to: "vendor-overview",
        icon: FaChartBar,
        label: "Dashboard Overview",
        color: "text-primary-600 dark:text-primary-400",
      },
      {
        to: "vendor-profile",
        icon: FaUser,
        label: "Vendor Profile",
        color: "text-secondary-600 dark:text-secondary-400",
      },
      {
        to: "add-ticket",
        icon: FaPlusCircle,
        label: "Add Ticket",
        color: "text-success-600 dark:text-success-400",
      },
      {
        to: "my-added-tickets",
        icon: FaTicketAlt,
        label: "My Added Tickets",
        color: "text-accent-600 dark:text-accent-400",
      },
      {
        to: "requested-bookings",
        icon: FaHistory,
        label: "Manage Bookings",
        color: "text-warning-600 dark:text-warning-400",
      },
    ];
  } else if (role === "user") {
    sidebarItems = [
      {
        to: "profile",
        icon: FaUser,
        label: "User Profile",
        color: "text-primary-600 dark:text-primary-400",
      },
      {
        to: "my-bookings",
        icon: FaTicketAlt,
        label: "My Booked Tickets",
        color: "text-secondary-600 dark:text-secondary-400",
      },
      {
        to: "transaction-history",
        icon: FaHistory,
        label: "Transaction History",
        color: "text-success-600 dark:text-success-400",
      },
    ];
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading Dashboard..." />;
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen gradient-surface">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden bg-surface-light dark:bg-surface-dark shadow-soft border-b border-neutral-200/50 dark:border-neutral-700/50 p-4"
        >
          <div className="flex items-center justify-between">
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              htmlFor="my-drawer-2"
              className="btn-primary-custom lg:hidden"
            >
              <FaBus className="mr-2" />
              Menu
            </motion.label>
            <div className="flex items-center space-x-3">
              <div className="image-avatar w-10 h-10">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                    {user?.displayName?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </div>
                )}
              </div>
              <div className="text-sm">
                <div className="font-medium text-neutral-800 dark:text-neutral-200">
                  {user?.displayName || "User"}
                </div>
                <div className="text-caption capitalize">{role}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 lg:p-8"
        >
          <div className="card-glass min-h-[calc(100vh-8rem)] p-6 lg:p-8">
            <Outlet />
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="w-80 min-h-full bg-surface-light dark:bg-surface-dark shadow-strong border-r border-neutral-200/50 dark:border-neutral-700/50 relative z-50"
        >
          {/* Sidebar Header */}
          <motion.div
            variants={itemVariants}
            className="p-6 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div className="text-primary-600 dark:text-primary-400 text-3xl">
                <FaBus />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold font-display text-neutral-800 dark:text-neutral-200">
                  TicketBari
                </h2>
                <p className="text-caption">Professional Dashboard</p>
              </div>
            </div>

            {/* User Info */}
            <div className="card-glass p-4">
              <div className="flex items-center space-x-3">
                <div className="image-avatar w-12 h-12">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                      {user?.displayName?.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                    {user?.displayName || "User"}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {user?.email}
                  </div>
                  <div
                    className={`text-xs font-semibold capitalize mt-1 ${
                      role === "admin"
                        ? "text-error-600 dark:text-error-400"
                        : role === "vendor"
                        ? "text-warning-600 dark:text-warning-400"
                        : "text-primary-600 dark:text-primary-400"
                    }`}
                  >
                    {role} Account
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="p-4">
            <motion.div variants={itemVariants} className="space-y-2">
              {sidebarItems?.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.to}
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={item.to} className="sidebar-link group">
                      <Icon className={`sidebar-link-icon ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Divider */}
            <div className="divider-custom"></div>

            {/* Bottom Actions */}
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.div
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/" className="sidebar-link group">
                  <FaBus className="sidebar-link-icon text-primary-500" />
                  <span className="font-medium">Back to Site</span>
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="sidebar-link group w-full text-left"
              >
                <FaSignOutAlt className="sidebar-link-icon text-error-500" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
