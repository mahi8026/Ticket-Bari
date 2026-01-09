import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaSearch,
  FaExclamationTriangle,
  FaArrowLeft,
  FaBug,
  FaTicketAlt,
} from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const isNotFound = error?.status === 404 || !error?.status;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto"
      >
        {/* Floating Icons */}
        <div className="relative mb-8">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute -top-10 -left-10 text-primary/20"
          >
            <FaTicketAlt className="text-4xl" />
          </motion.div>
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
            className="absolute -top-5 -right-8 text-secondary/20"
          >
            <FaBug className="text-3xl" />
          </motion.div>
        </div>

        {/* Error Code */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          >
            {isNotFound ? "404" : "Error"}
          </motion.h1>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4"
            >
              <FaExclamationTriangle className="text-2xl text-red-500" />
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {isNotFound ? "Page Not Found" : "Something Went Wrong"}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            {isNotFound
              ? "The page you're looking for doesn't exist or has been moved to a new location."
              : "We encountered an unexpected error. Our team has been notified and is working on a fix."}
          </p>

          {error?.statusText || error?.message ? (
            <motion.div
              variants={itemVariants}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 max-w-md mx-auto"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {error.statusText || error.message}
              </p>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="btn-primary-custom text-lg px-8 py-3 flex items-center"
            >
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="btn-outline-custom text-lg px-8 py-3 flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Additional Help */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="card-consistent p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Need Help?
            </h3>
            <div className="space-y-3">
              <Link
                to="/tickets"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaTicketAlt className="mr-3" />
                Browse Available Tickets
              </Link>
              <Link
                to="/contact"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaSearch className="mr-3" />
                Contact Support
              </Link>
              <Link
                to="/help"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaExclamationTriangle className="mr-3" />
                Visit Help Center
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Fun Element */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-gray-400 dark:text-gray-600"
        >
          <p className="text-sm">
            Lost? Don't worry, even the best travelers take wrong turns
            sometimes! 🧭
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
