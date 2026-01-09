import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = "large",
  message = "Loading...",
  type = "spinner",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
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

  if (type === "hamster") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center min-h-screen w-full bg-white dark:bg-gray-900"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </motion.div>
        {message && (
          <motion.p
            variants={itemVariants}
            className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    );
  }

  if (type === "dots") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center min-h-screen w-full bg-white dark:bg-gray-900"
      >
        <motion.div variants={itemVariants} className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </motion.div>
        {message && (
          <motion.p
            variants={itemVariants}
            className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    );
  }

  // Default spinner type
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center min-h-screen w-full bg-white dark:bg-gray-900"
    >
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        className={`spinner ${sizeClasses[size]}`}
      ></motion.div>
      {message && (
        <motion.p
          variants={itemVariants}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

// Inline loading component for smaller areas
export const InlineSpinner = ({ size = "medium", message, className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`spinner ${sizeClasses[size]}`}
      ></motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-gray-600 dark:text-gray-400 text-sm"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

// Card skeleton loader
export const CardSkeleton = ({ count = 1 }) => {
  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
      className="contents"
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="card-consistent animate-pulse"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-48 bg-gray-200 dark:bg-gray-700 skeleton"
          ></motion.div>
          <div className="p-5 space-y-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              className="h-4 bg-gray-200 dark:bg-gray-700 skeleton rounded w-3/4"
            ></motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="h-3 bg-gray-200 dark:bg-gray-700 skeleton rounded w-1/2"
            ></motion.div>
            <div className="flex justify-between items-center pt-4">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="h-6 bg-gray-200 dark:bg-gray-700 skeleton rounded w-20"
              ></motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="h-8 bg-gray-200 dark:bg-gray-700 skeleton rounded w-24"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Table skeleton loader
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 skeleton rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 skeleton rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingSpinner;
