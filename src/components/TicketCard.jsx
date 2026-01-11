import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
  FaWifi,
  FaSnowflake,
  FaTags,
  FaDollarSign,
  FaFire,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const TicketCard = ({ ticket, index = 0 }) => {
  const {
    _id,
    title,
    price,
    quantity,
    seatsAvailable,
    ticketType: transportType = "",
    imageUrl: image,
    from,
    to,
    departureDate,
    perks,
  } = ticket;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  // Transport type icons
  const getTransportIcon = (type) => {
    if (!type || typeof type !== "string") {
      return FaTags;
    }

    const iconMap = {
      bus: FaBus,
      train: FaTrain,
      launch: FaShip,
      plane: FaPlane,
      flight: FaPlane,
      ship: FaShip,
    };
    return iconMap[type.toLowerCase()] || FaTags;
  };

  // Transport type colors using our professional color system
  const getTransportColor = (type) => {
    if (!type || typeof type !== "string") {
      return "bg-neutral-500";
    }

    const colorMap = {
      bus: "bg-primary-500",
      train: "bg-success-500",
      launch: "bg-secondary-500",
      plane: "bg-accent-500",
      flight: "bg-accent-500",
      ship: "bg-secondary-500",
    };
    return colorMap[type.toLowerCase()] || "bg-neutral-500";
  };

  const TransportIcon = getTransportIcon(transportType);
  const transportColor = getTransportColor(transportType);
  const displaySeats = seatsAvailable !== undefined ? seatsAvailable : quantity;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-premium group hover-lift h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={
            image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
          }
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Transport Type Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4"
        >
          <div
            className={`${transportColor} text-white px-3 py-1.5 rounded-full flex items-center space-x-2 text-sm font-semibold shadow-soft`}
          >
            <TransportIcon className="text-sm" />
            <span className="capitalize">{transportType || "Ticket"}</span>
          </div>
        </motion.div>

        {/* Hot Deal Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4"
        >
          <div className="bg-accent-500 text-white px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm font-semibold shadow-soft">
            <FaFire className="text-sm" />
            <span>Hot Deal</span>
          </div>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 left-4"
        >
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-soft ${
              displaySeats > 10
                ? "bg-success-500 text-white"
                : displaySeats > 0
                ? "bg-warning-500 text-white"
                : "bg-error-500 text-white"
            }`}
          >
            {displaySeats > 0 ? `${displaySeats} seats` : "Sold Out"}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold font-display mb-3 text-neutral-800 dark:text-neutral-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
        >
          {title}
        </motion.h2>

        {/* Route Information */}
        {from && to && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between mb-4 text-sm"
          >
            <div className="flex items-center text-neutral-600 dark:text-neutral-400">
              <MdLocationOn className="mr-1 text-primary-500" />
              <span className="font-medium">{from}</span>
            </div>
            <div className="flex-1 mx-3 border-t border-dashed border-neutral-300 dark:border-neutral-600 relative">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <TransportIcon className="text-primary-500 bg-surface-light dark:bg-surface-dark px-1 rounded" />
              </motion.div>
            </div>
            <div className="flex items-center text-neutral-600 dark:text-neutral-400">
              <span className="font-medium">{to}</span>
              <MdLocationOn className="ml-1 text-primary-500" />
            </div>
          </motion.div>
        )}

        {/* Departure Information */}
        {departureDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-4"
          >
            <FaClock className="mr-2 text-primary-500" />
            <div>
              <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                Departure
              </div>
              <div>
                {formatDate(departureDate)} at {formatTime(departureDate)}
              </div>
            </div>
          </motion.div>
        )}

        {/* Perks/Amenities */}
        {perks && perks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-4"
          >
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Amenities:
            </h3>
            <div className="flex flex-wrap gap-2">
              {perks.slice(0, 3).map((perk, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="badge-info"
                >
                  {perk}
                </motion.span>
              ))}
              {perks.length > 3 && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  +{perks.length - 3} more
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Spacer to push price section to bottom */}
        <div className="flex-grow"></div>

        {/* Price and Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold font-display text-primary-600 dark:text-primary-400 flex items-center"
          >
            <span className="text-lg mr-1">$</span>
            {price}
          </motion.div>

          <div className="flex space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/ticket/${_id}`}
                className="btn-outline-custom text-sm px-4 py-2"
              >
                View Details
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/ticket/${_id}`}
                className={`text-sm px-4 py-2 ${
                  displaySeats > 0
                    ? "btn-primary-custom"
                    : "btn-ghost-custom opacity-50 cursor-not-allowed"
                }`}
              >
                {displaySeats > 0 ? "Book Now" : "Sold Out"}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Seats Available Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-4 text-center"
        >
          {displaySeats > 10 ? (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-success-600 dark:text-success-400 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-success-500 rounded-full"></span>
              Available ({displaySeats} seats)
            </motion.span>
          ) : displaySeats > 0 ? (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-warning-600 dark:text-warning-400 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></span>
              Only {displaySeats} seats left
            </motion.span>
          ) : (
            <span className="text-error-600 dark:text-error-400 text-sm font-semibold flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-error-500 rounded-full"></span>
              Sold Out
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TicketCard;
