import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaHistory,
  FaSpinner,
  FaIdCard,
  FaEdit,
  FaCog,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UserProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const userEmail = user?.email;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const {
    data: userProfile,
    isLoading: profileLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userEmail],
    enabled: !!userEmail && !authLoading,
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axios.get(
        `${API_BASE_URL}/users/profile/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  if (authLoading || profileLoading) {
    return <LoadingSpinner message="Loading User Profile..." />;
  }

  if (error) {
    toast.error("Failed to load user profile. Please try again.");
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto p-6 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 shadow-md rounded-xl"
      >
        <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 flex items-center">
          <FaShieldAlt className="mr-3" /> Error Loading Profile
        </h3>
        <p className="text-red-600 dark:text-red-300 mt-2">
          Could not fetch user data. Check server connection or authentication
          status.
        </p>
        <p className="text-sm italic mt-1 text-red-500 dark:text-red-400">
          Error: {error.message}
        </p>
      </motion.div>
    );
  }

  const {
    name,
    email,
    photo,
    role = "user",
  } = userProfile || { email: userEmail };

  const getRoleStyles = (userRole) => {
    switch (userRole) {
      case "admin":
        return { text: "text-red-700", bg: "bg-red-100", icon: "👑" };
      case "vendor":
        return { text: "text-green-700", bg: "bg-green-100", icon: "🎫" };
      default:
        return { text: "text-blue-700", bg: "bg-blue-100", icon: "👤" };
    }
  };

  const roleStyles = getRoleStyles(role);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Header Section */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 mb-8 shadow-lg"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            {photo ? (
              <img
                src={photo}
                alt={name || "User"}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                <FaUserCircle className="text-4xl text-white" />
              </div>
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
            >
              <span className="text-xs text-white">✓</span>
            </motion.div>
          </motion.div>
          <div className="flex-1">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
            >
              {name || "Welcome to Your Profile"}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-white/80 mb-2">
              {email}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2"
            >
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${roleStyles.bg} ${roleStyles.text}`}
              >
                {roleStyles.icon} {role}
              </span>
              <span className="text-white/60 text-sm">Account</span>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.info("Profile editing coming soon!")}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Profile Details */}
      <motion.div variants={containerVariants} className="space-y-6 mb-8">
        {name && (
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="card-consistent p-6 flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <FaIdCard className="text-2xl text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {name}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card-consistent p-6 flex items-center space-x-4"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
          >
            <FaEnvelope className="text-2xl text-green-600 dark:text-green-400" />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email Address
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {email}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
          >
            Verified
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card-consistent p-6 flex items-center space-x-4"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 ${roleStyles.bg} rounded-full flex items-center justify-center`}
          >
            <FaShieldAlt className={`text-2xl ${roleStyles.text}`} />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Account Role
            </p>
            <div className="flex items-center space-x-2">
              <span
                className={`px-4 py-2 rounded-full text-base font-bold capitalize ${roleStyles.bg} ${roleStyles.text}`}
              >
                {roleStyles.icon} {role}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={cardVariants} className="card-consistent p-8">
        <motion.h3
          variants={itemVariants}
          className="text-2xl font-bold mb-6 text-primary flex items-center"
        >
          <FaCog className="mr-3" />
          Quick Actions
        </motion.h3>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard/transaction-history"
              className="block p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaHistory className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Transaction History
                    </h4>
                    <p className="text-blue-100 text-sm">
                      View all transactions
                    </p>
                  </div>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => toast.info("Profile editing feature coming soon!")}
              className="block w-full p-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-2xl" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">Edit Profile</h4>
                    <p className="text-purple-100 text-sm">
                      Update personal details
                    </p>
                  </div>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
