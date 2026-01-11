import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapMarkerAlt,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaSyncAlt,
  FaRocket,
} from "react-icons/fa";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTickets, setSelectedTickets] = useState([]);

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

  // Simple filtering and sorting logic
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) => {
      const matchesFilter =
        filter === "all" || ticket.verificationStatus === filter;
      const matchesSearch =
        searchTerm === "" ||
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.to?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    // Sort tickets
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "price") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === "dateAdded") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tickets, filter, searchTerm, sortBy, sortOrder]);

  // Simple statistics
  const stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter(
      (t) => t.verificationStatus === "pending"
    ).length;
    const approved = tickets.filter(
      (t) => t.verificationStatus === "approved"
    ).length;
    const rejected = tickets.filter(
      (t) => t.verificationStatus === "rejected"
    ).length;
    const advertised = tickets.filter((t) => t.isAdvertised).length;

    return { total, pending, approved, rejected, advertised };
  }, [tickets]);

  // Transport type icon helper
  const getTransportIcon = (type) => {
    const iconMap = {
      bus: FaBus,
      train: FaTrain,
      launch: FaShip,
      flight: FaPlane,
      plane: FaPlane,
    };
    return iconMap[type?.toLowerCase()] || FaTicketAlt;
  };

  const getStatusBadgeClass = (status) => {
    const classMap = {
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };
    return classMap[status] || classMap.pending;
  };

  const handleVerification = async (ticket, newStatus) => {
    const actionVerb = newStatus === "approved" ? "Approve" : "Reject";

    const result = await Swal.fire({
      title: `${actionVerb} Ticket?`,
      text: `${actionVerb} "${ticket.title}" by ${ticket.operatorName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#10b981" : "#ef4444",
      confirmButtonText: `Yes, ${actionVerb}!`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/tickets/status/${ticket._id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`Ticket ${actionVerb.toLowerCase()}d successfully!`);
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(`Failed to ${actionVerb.toLowerCase()} ticket`);
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedTickets.length === 0) {
      toast.warning("Please select tickets first");
      return;
    }

    const actionVerb = action === "approved" ? "approve" : "reject";
    const result = await Swal.fire({
      title: `Bulk ${actionVerb} ${selectedTickets.length} tickets?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approved" ? "#10b981" : "#ef4444",
      confirmButtonText: `Yes, ${actionVerb} all!`,
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(
          selectedTickets.map((ticketId) =>
            axiosSecure.patch(`/tickets/status/${ticketId}`, { status: action })
          )
        );

        refetch();
        setSelectedTickets([]);
        toast.success(
          `${selectedTickets.length} tickets ${actionVerb}d successfully!`
        );
      } catch (error) {
        console.error("Bulk action error:", error);
        toast.error(`Failed to ${actionVerb} tickets`);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading ticket management..." />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Tickets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and manage ticket submissions
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaSyncAlt className="text-sm" />
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaTicketAlt className="text-2xl text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Tickets
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaClock className="text-2xl text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaCheckCircle className="text-2xl text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Approved
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.approved}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaTimesCircle className="text-2xl text-red-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rejected
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.rejected}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaRocket className="text-2xl text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Featured
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.advertised}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by title, vendor, route..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white appearance-none min-w-[150px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="relative">
            <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white appearance-none min-w-[160px]"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="dateAdded-desc">Newest First</option>
              <option value="dateAdded-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="price-desc">Price High-Low</option>
              <option value="price-asc">Price Low-High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTickets.length > 0 && (
        <div className="mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700 flex items-center justify-between">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              {selectedTickets.length} ticket(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("approved")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaCheck />
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction("rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FaTimes />
                Reject All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {filteredAndSortedTickets.length} Ticket(s) Found
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTickets(
                          filteredAndSortedTickets.map((t) => t._id)
                        );
                      } else {
                        setSelectedTickets([]);
                      }
                    }}
                    checked={
                      selectedTickets.length ===
                        filteredAndSortedTickets.length &&
                      filteredAndSortedTickets.length > 0
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ticket Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Route & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedTickets.map((ticket) => {
                const TransportIcon = getTransportIcon(ticket.ticketType);
                const isPending = ticket.verificationStatus === "pending";
                const isSelected = selectedTickets.includes(ticket._id);

                return (
                  <tr
                    key={ticket._id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      isPending ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
                    } ${
                      isSelected ? "bg-indigo-50 dark:bg-indigo-900/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTickets([
                              ...selectedTickets,
                              ticket._id,
                            ]);
                          } else {
                            setSelectedTickets(
                              selectedTickets.filter((id) => id !== ticket._id)
                            );
                          }
                        }}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg overflow-hidden mr-3">
                          <img
                            className="h-full w-full object-cover"
                            src={ticket.imageUrl || "/placeholder-ticket.jpg"}
                            alt={ticket.title}
                            onError={(e) => {
                              e.target.src = "/placeholder-ticket.jpg";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Added{" "}
                            {new Date(ticket.dateAdded).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <TransportIcon className="text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                          {ticket.ticketType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {ticket.from} → {ticket.to}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.operatorName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {ticket.vendorEmail}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          ${ticket.price}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {ticket.quantity} available
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          ticket.verificationStatus
                        )}`}
                      >
                        {ticket.verificationStatus === "approved" && (
                          <FaCheckCircle className="mr-1" />
                        )}
                        {ticket.verificationStatus === "rejected" && (
                          <FaTimesCircle className="mr-1" />
                        )}
                        {ticket.verificationStatus === "pending" && (
                          <FaClock className="mr-1" />
                        )}
                        {ticket.verificationStatus.toUpperCase()}
                      </span>
                      {ticket.isAdvertised && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            <FaRocket className="mr-1" />
                            Featured
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {isPending ? (
                          <>
                            <button
                              onClick={() =>
                                handleVerification(ticket, "approved")
                              }
                              className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                            >
                              <FaCheck className="mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVerification(ticket, "rejected")
                              }
                              className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                            >
                              <FaTimes className="mr-1" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <button className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 transition-colors">
                            <FaEye className="mr-1" />
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAndSortedTickets.length === 0 && (
          <div className="text-center py-12">
            <FaTicketAlt className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter !== "all" || searchTerm
                ? "Try adjusting your filters or search terms."
                : "No tickets have been submitted yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
