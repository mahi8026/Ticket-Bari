import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaRocket,
  FaStar,
  FaHeart,
  FaBolt,
  FaMagic,
  FaFire,
} from "react-icons/fa";

const AnimationDemo = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const demoCards = [
    {
      id: 1,
      title: "Smooth Animations",
      description: "Framer Motion powered smooth transitions",
      icon: FaRocket,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Interactive Elements",
      description: "Hover and click animations",
      icon: FaStar,
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Toast Notifications",
      description: "Beautiful notification system",
      icon: FaHeart,
      color: "bg-red-500",
    },
    {
      id: 4,
      title: "Micro Interactions",
      description: "Delightful user feedback",
      icon: FaBolt,
      color: "bg-purple-500",
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const showToasts = () => {
    toast.success("🎉 Success! Animation demo is working perfectly!");
    setTimeout(() => {
      toast.info("ℹ️ This is an info notification with Framer Motion!");
    }, 1000);
    setTimeout(() => {
      toast.warning("⚠️ Warning: You're about to be amazed!");
    }, 2000);
    setTimeout(() => {
      toast.error("❌ Error: Just kidding! Everything is working great!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            🎨
          </motion.span>{" "}
          Animation Demo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Experience the power of Framer Motion and React Toastify
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={showToasts}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            <FaMagic className="inline mr-2" />
            Show Toast Notifications
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(!isVisible)}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            <FaFire className="inline mr-2" />
            Toggle Visibility
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {demoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    rotate: Math.random() * 4 - 2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCard(card);
                    toast.success(`Selected: ${card.title}`);
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}
                  >
                    <Icon className="text-2xl text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    {card.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-4"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-20 right-10 text-4xl"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed bottom-20 left-10 text-4xl"
      >
        🚀
      </motion.div>

      {/* Selected Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className={`${selectedCard.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <selectedCard.icon className="text-3xl text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedCard.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedCard.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCard(null)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimationDemo;
