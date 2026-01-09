import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaTicketAlt,
  FaClock,
} from "react-icons/fa";

const ManageBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: vendorBookings = [],
    refetch,
    isLoading: bookingsLoading,
  } = useQuery({
    queryKey: ["vendorBookings", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/vendor?email=${user.email}`);
      return res.data;
    },
  });

  const handleStatusUpdate = async (bookingId, newStatus, ticketTitle) => {
    const actionVerb = newStatus === "approved" ? "Approve" : "Reject";

    if (newStatus === "paid") {
      Swal.fire(
        "Blocked",
        "Cannot change status of a PAID booking.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: `Confirm ${actionVerb}?`,
      text: `Do you want to ${actionVerb} the booking for "${ticketTitle}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#00C851" : "#FF4757",
      cancelButtonColor: "#64748B",
      confirmButtonText: `Yes, ${actionVerb} It!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/bookings/status/${bookingId}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: `${actionVerb}d!`,
              text: `Booking status updated to ${newStatus.toUpperCase()}.`,
              icon: "success",
              timer: 1500,
            });
          }
        } catch (error) {
          Swal.fire(
            "Error",
            `Failed to update status: ${error.message}`,
            "error"
          );
        }
      }
    });
  };

  if (authLoading || bookingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    );
  }

  const pendingBookings = vendorBookings.filter((b) => b.status === "pending");
  const allOtherBookings = vendorBookings.filter((b) => b.status !== "pending");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-custom section-padding"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="heading-2 text-primary-600 dark:text-primary-400 mb-4">
          Booking Management
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage and approve booking requests for your tickets
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid-cards-4 mb-8"
      >
        <div className="stats-card">
          <div className="stats-icon">
            <FaClock className="text-warning-500" />
          </div>
          <div className="stats-number">{pendingBookings.length}</div>
          <div className="stats-label">Pending Approval</div>
        </div>
        <div className="stats-card">
          <div className="stats-icon">
            <FaCheck className="text-success-500" />
          </div>
          <div className="stats-number">
            {vendorBookings.filter((b) => b.status === "approved").length}
          </div>
          <div className="stats-label">Approved</div>
        </div>
        <div className="stats-card">
          <div className="stats-icon">
            <FaDollarSign className="text-primary-500" />
          </div>
          <div className="stats-number">
            {vendorBookings.filter((b) => b.status === "paid").length}
          </div>
          <div className="stats-label">Paid</div>
        </div>
        <div className="stats-card">
          <div className="stats-icon">
            <FaTicketAlt className="text-secondary-500" />
          </div>
          <div className="stats-number">{vendorBookings.length}</div>
          <div className="stats-label">Total Bookings</div>
        </div>
      </motion.div>

      {/* Pending Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="heading-3 text-warning-600 dark:text-warning-400 mb-6 flex items-center gap-3">
          <FaClock />
          Pending Approval ({pendingBookings.length})
        </h2>
        <BookingTable
          bookings={pendingBookings}
          handleStatusUpdate={handleStatusUpdate}
          isActionable={true}
        />
      </motion.div>

      {/* Processed Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="heading-3 text-neutral-700 dark:text-neutral-300 mb-6 flex items-center gap-3">
          <FaEye />
          Processed Bookings ({allOtherBookings.length})
        </h2>
        <BookingTable
          bookings={allOtherBookings}
          handleStatusUpdate={handleStatusUpdate}
          isActionable={false}
        />
      </motion.div>

      {/* Empty State */}
      {vendorBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-16 text-center"
        >
          <FaTicketAlt className="text-6xl text-neutral-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            No Bookings Yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            You haven't received any booking requests for your tickets yet.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const BookingTable = ({ bookings, handleStatusUpdate, isActionable }) => {
  if (bookings.length === 0) {
    return (
      <div className="card-premium p-8 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          No bookings in this category
        </p>
      </div>
    );
  }

  return (
    <div className="table-custom">
      <table className="w-full">
        <thead className="table-header">
          <tr>
            <th className="table-cell">#</th>
            <th className="table-cell">Ticket</th>
            <th className="table-cell">Customer</th>
            <th className="table-cell">Date</th>
            <th className="table-cell">Qty</th>
            <th className="table-cell">Total</th>
            <th className="table-cell">Status</th>
            {isActionable && <th className="table-cell">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => {
            const getStatusBadge = (status) => {
              switch (status) {
                case "paid":
                  return "badge-success";
                case "approved":
                  return "badge-info";
                case "rejected":
                  return "badge-error";
                default:
                  return "badge-warning";
              }
            };

            return (
              <motion.tr
                key={booking._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`table-row ${
                  booking.status === "paid"
                    ? "bg-success-50 dark:bg-success-900/20"
                    : ""
                }`}
              >
                <td className="table-cell font-semibold">{index + 1}</td>
                <td className="table-cell">
                  <div className="font-medium text-neutral-800 dark:text-neutral-200">
                    {booking.title}
                  </div>
                </td>
                <td className="table-cell">
                  <div>
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">
                      {booking.userName || "N/A"}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {booking.userEmail}
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary-500" />
                    {new Date(
                      booking.date || booking.bookingDate
                    ).toLocaleDateString()}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-secondary-500" />
                    {booking.quantity}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2 font-semibold text-primary-600 dark:text-primary-400">
                    <FaDollarSign />
                    {parseFloat(booking.totalPrice).toFixed(2)}
                  </div>
                </td>
                <td className="table-cell">
                  <span className={`${getStatusBadge(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                {isActionable && (
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleStatusUpdate(
                            booking._id,
                            "approved",
                            booking.title
                          )
                        }
                        className="btn-primary-custom text-xs px-3 py-1"
                      >
                        <FaCheck className="mr-1" />
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleStatusUpdate(
                            booking._id,
                            "rejected",
                            booking.title
                          )
                        }
                        className="bg-error-500 hover:bg-error-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <FaTimes className="mr-1" />
                        Reject
                      </motion.button>
                    </div>
                  </td>
                )}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
