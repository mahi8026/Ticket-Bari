import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaTicketAlt,
  FaCheck,
  FaTimes,
  FaEye,
  FaFilter,
  FaSearch,
  FaSort,
  FaChartBar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

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

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTicketsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/all");
      return res.data;
    },
  });

  const handleVerification = async (ticket, newStatus) => {
    const actionVerb = newStatus === "approved" ? "Approve" : "Reject";

    Swal.fire({
      title: `Confirm ${actionVerb}?`,
      text: `Ticket: "${ticket.title}" (Vendor: ${ticket.operatorName})`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#38a169" : "#e53e3e",
      confirmButtonText: `Yes, ${actionVerb} It!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/tickets/status/${ticket._id}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: `${actionVerb}d!`,
              text: `Ticket status updated to ${newStatus.toUpperCase()}.`,
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

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <div class="spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  const pendingTickets = tickets.filter(
    (t) => t.verificationStatus === "pending"
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Tickets</h2>
      <h3 className="text-xl font-semibold mb-4 text-warning-content">
        Tickets Pending Verification ({pendingTickets.length})
      </h3>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-300 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Vendor</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              const isPending = ticket.verificationStatus === "pending";
              const statusColor =
                ticket.verificationStatus === "approved"
                  ? "badge-success"
                  : ticket.verificationStatus === "rejected"
                  ? "badge-error"
                  : "badge-warning";

              return (
                <tr key={ticket._id} className={isPending ? "bg-amber-50" : ""}>
                  <th>{index + 1}</th>
                  <td>{ticket.title}</td>
                  <td>
                    {ticket.operatorName} ({ticket.vendorEmail})
                  </td>
                  <td>{ticket.price}</td>
                  <td>{ticket.quantity}</td>
                  <td>
                    <span className={`badge ${statusColor} text-white`}>
                      {ticket.verificationStatus.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleVerification(ticket, "approved")}
                          className="btn btn-xs btn-success text-white mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerification(ticket, "rejected")}
                          className="btn btn-xs btn-error text-white"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 capitalize">
                        {ticket.verificationStatus}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
