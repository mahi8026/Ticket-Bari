import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Shared/Footer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  const { loading: authLoading } = useAuth();
  const { isRoleLoading } = useRole();

  // Animation variants
  const layoutVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const mainVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (authLoading || isRoleLoading) {
    return <LoadingSpinner message="Initializing TicketBari..." />;
  }

  return (
    <motion.div
      variants={layoutVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <Navbar />

      <motion.main variants={mainVariants} className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>

      <Footer />
    </motion.div>
  );
};

export default MainLayout;
