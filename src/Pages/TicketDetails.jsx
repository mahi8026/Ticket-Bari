import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import BookingModal from "../components/BookingModal";
import Countdown from "react-countdown";
import SEOHead from "../components/SEO/SEOHead";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaTags,
  FaMapMarkerAlt,
  FaUsers,
  FaTicketAlt,
  FaFire,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdEventSeat } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div className="flex items-center gap-2 text-error-600 dark:text-error-400">
        <FaTimesCircle />
        <span className="text-xl font-bold">DEPARTED!</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
        <FaClock className="animate-pulse" />
        <span className="text-lg font-mono font-semibold">
          {days}D {hours}h {minutes}m {seconds}s remaining
        </span>
      </div>
    );
  }
};

const TicketDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime] = useState(() => Date.now());

  const {
    data: ticket = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  // Get transport icon
  const getTransportIcon = (type) => {
    const iconMap = {
      bus: FaBus,
      train: FaTrain,
      launch: FaShip,
      plane: FaPlane,
      flight: FaPlane,
      ship: FaShip,
    };
    return iconMap[type?.toLowerCase()] || FaTicketAlt;
  };

  // Get transport color
  const getTransportColor = (type) => {
    const colorMap = {
      bus: "text-primary-500",
      train: "text-success-500",
      launch: "text-secondary-500",
      plane: "text-accent-500",
      flight: "text-accent-500",
      ship: "text-secondary-500",
    };
    return colorMap[type?.toLowerCase()] || "text-neutral-500";
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading ticket details...
          </p>
        </div>
      </div>
    );
  }

  if (!ticket || !ticket._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card-premium p-16 text-center max-w-md">
          <FaTimesCircle className="text-6xl text-error-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Ticket Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            The ticket you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const departureTime = new Date(ticket.departureDate).getTime();
  const hasDeparted = departureTime < currentTime;
  const isSoldOut = ticket.seatsAvailable <= 0;
  const isBookDisabled = hasDeparted || isSoldOut || !user;
  const TransportIcon = getTransportIcon(ticket.ticketType);
  const transportColor = getTransportColor(ticket.ticketType);

  return (
    <>
      <SEOHead
        title={`${ticket.title} - TicketBari`}
        description={`Book ${ticket.ticketType} tickets from ${ticket.from} to ${ticket.to}. Price: $${ticket.price} per seat. ${ticket.seatsAvailable} seats available.`}
        keywords={`${ticket.ticketType} tickets, ${ticket.from}, ${ticket.to}, travel Bangladesh, book tickets`}
        url={`/ticket/${id}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-5 gap-8"
          >
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="card-premium overflow-hidden h-full min-h-[400px]">
                <div className="relative h-full">
                  <img
                    src={
                      ticket.imageUrl ||
                      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm ${transportColor}`}
                    >
                      <TransportIcon className="text-lg" />
                      <span className="font-semibold capitalize">
                        {ticket.ticketType}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white">
                      <FaFire />
                      <span className="font-semibold">Hot Deal</span>
                    </div>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-primary-600">
                        <FaDollarSign className="text-2xl" />
                        <div>
                          <div className="text-3xl font-bold">
                            {ticket.price}
                          </div>
                          <div className="text-sm text-neutral-600">
                            per seat
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Header */}
              <div className="card-premium p-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="heading-2 text-neutral-800 dark:text-neutral-200 mb-4"
                >
                  {ticket.title}
                </motion.h1>

                {/* Route */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <MdLocationOn className="text-2xl text-primary-500" />
                    <div>
                      <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        {ticket.from}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Departure
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 mx-6 relative">
                    <div className="border-t-2 border-dashed border-primary-300 dark:border-primary-600"></div>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaArrowRight className="text-primary-500 bg-white dark:bg-neutral-800 px-2 rounded" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        {ticket.to}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Arrival
                      </div>
                    </div>
                    <MdLocationOn className="text-2xl text-primary-500" />
                  </div>
                </motion.div>

                {/* Key Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-xl">
                    <MdEventSeat className="text-2xl text-secondary-500" />
                    <div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Available Seats
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          isSoldOut
                            ? "text-error-600 dark:text-error-400"
                            : "text-success-600 dark:text-success-400"
                        }`}
                      >
                        {ticket.seatsAvailable || 0}
                        {isSoldOut && " (Sold Out)"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-xl">
                    <TransportIcon className={`text-2xl ${transportColor}`} />
                    <div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Transport Type
                      </div>
                      <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200 capitalize">
                        {ticket.ticketType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departure Time */}
              <div className="card-premium p-8">
                <h2 className="heading-3 text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-3">
                  <FaCalendarAlt className="text-accent-500" />
                  Departure Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lg">
                    <MdAccessTime className="text-primary-500" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {new Date(departureTime).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <Countdown
                      date={departureTime}
                      renderer={countdownRenderer}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {ticket.perks && ticket.perks.length > 0 && (
                <div className="card-premium p-8">
                  <h2 className="heading-3 text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-3">
                    <FaTags className="text-secondary-500" />
                    Amenities & Features
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ticket.perks.map((perk, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="badge-info flex items-center gap-2 p-3"
                      >
                        <FaCheckCircle className="text-success-500" />
                        <span>{perk}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Section */}
              <div className="card-premium p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="text-4xl font-bold font-display text-primary-600 dark:text-primary-400 mb-2">
                      ${ticket.price}
                      <span className="text-lg text-neutral-600 dark:text-neutral-400 ml-2">
                        per seat
                      </span>
                    </div>
                    {!user && (
                      <p className="text-warning-600 dark:text-warning-400 flex items-center gap-2">
                        <FaExclamationTriangle />
                        Please login to book tickets
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: isBookDisabled ? 1 : 1.05 }}
                    whileTap={{ scale: isBookDisabled ? 1 : 0.95 }}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all ${
                      isBookDisabled
                        ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
                        : "btn-primary-custom"
                    }`}
                    onClick={() => setIsModalOpen(true)}
                    disabled={isBookDisabled}
                  >
                    <FaTicketAlt />
                    {hasDeparted
                      ? "Departed"
                      : isSoldOut
                      ? "Sold Out"
                      : "Book Now"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <BookingModal
        ticket={ticket}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        refetchTickets={refetch}
      />
    </>
  );
};

export default TicketDetails;
