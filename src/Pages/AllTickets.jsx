import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import SEOHead from "../components/SEO/SEOHead";
import LoadingSpinner, {
  CardSkeleton,
} from "../components/Shared/LoadingSpinner";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaTicketAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 9;

const AllTickets = () => {
  const [rawSearchInput, setRawSearchInput] = useState("");
  const [effectiveSearchQuery, setEffectiveSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "allTickets",
      effectiveSearchQuery,
      filterType,
      sortOrder,
      currentPage,
    ],
    queryFn: async () => {
      try {
        const params = {
          search: effectiveSearchQuery,
          filter: filterType,
          sort: sortOrder,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };
        const res = await axios.get(
          "https://ticket-bari-server-pi.vercel.app/tickets",
          { params }
        );
        return res.data;
      } catch (error) {
        toast.error("Failed to load tickets. Please try again.");
        throw error;
      }
    },
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 0;
  const totalTickets = data?.totalTickets || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setEffectiveSearchQuery(rawSearchInput);
    if (rawSearchInput) {
      toast.info(`Searching for "${rawSearchInput}"...`);
    }
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
    setEffectiveSearchQuery(rawSearchInput);
    if (e.target.value) {
      toast.info(`Filtering by ${e.target.value} tickets`);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
    setEffectiveSearchQuery(rawSearchInput);
    if (e.target.value) {
      toast.info("Tickets sorted successfully");
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setRawSearchInput("");
    setEffectiveSearchQuery("");
    setFilterType("");
    setSortOrder("");
    setCurrentPage(1);
    toast.success("Filters cleared successfully");
  };

  const transportIcons = {
    Bus: FaBus,
    Train: FaTrain,
    Launch: FaShip,
    Plane: FaPlane,
  };

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="All Tickets - TicketBari"
          description="Browse all available bus, train, launch, and flight tickets across Bangladesh. Find the best deals and book your journey today."
          keywords="all tickets, bus tickets, train tickets, flight tickets, launch tickets, Bangladesh travel"
          url="/tickets"
        />
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-8">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="heading-1 text-neutral-800 dark:text-neutral-200 mb-4">
                All Available Tickets
              </h1>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            {/* Skeleton for filters */}
            <div className="card-premium p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Skeleton for tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSkeleton count={6} />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHead
          title="Error Loading Tickets - TicketBari"
          description="Unable to load tickets. Please try again."
          url="/tickets"
        />
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-8 flex items-center justify-center">
          <div className="card-premium p-12 max-w-md mx-4 text-center">
            <FaTicketAlt className="text-6xl text-error-500 mx-auto mb-6" />
            <h2 className="heading-3 text-neutral-800 dark:text-neutral-200 mb-4">
              Failed to Load Tickets
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We couldn't load the tickets. Please check your connection and try
              again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary-custom"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="All Tickets - TicketBari"
        description={`Browse ${totalTickets} available tickets across Bangladesh. Find bus, train, launch, and flight tickets with the best prices and instant booking.`}
        keywords="all tickets, bus tickets, train tickets, flight tickets, launch tickets, Bangladesh travel, book tickets online"
        url="/tickets"
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container-custom py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-1 text-neutral-800 dark:text-neutral-200 mb-4">
              All Available Tickets
            </h1>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Find and book your perfect journey from {totalTickets} available
              tickets across Bangladesh
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="card-premium p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search destinations (e.g., Dhaka to Cox's Bazar)"
                      className="form-input-custom pl-12"
                      value={rawSearchInput}
                      onChange={(e) => setRawSearchInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary-custom px-6">
                    <FaSearch className="mr-2" />
                    Search
                  </button>
                </form>
              </div>

              {/* Filter by Transport */}
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10" />
                <select
                  className="form-input-custom pl-12 appearance-none"
                  value={filterType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Transport Types</option>
                  {Object.entries(transportIcons).map(([type, Icon]) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10" />
                <select
                  className="form-input-custom pl-12 appearance-none"
                  value={sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="">Sort by Price</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters & Clear */}
            {(effectiveSearchQuery || filterType || sortOrder) && (
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Active filters:
                  </span>
                  {effectiveSearchQuery && (
                    <span className="badge-info flex items-center gap-2">
                      <FaMapMarkerAlt />
                      Search: "{effectiveSearchQuery}"
                    </span>
                  )}
                  {filterType && (
                    <span className="badge-success flex items-center gap-2">
                      {React.createElement(transportIcons[filterType])}
                      Type: {filterType}
                    </span>
                  )}
                  {sortOrder && (
                    <span className="badge-warning flex items-center gap-2">
                      <FaSort />
                      Sort:{" "}
                      {sortOrder.includes("asc")
                        ? "Low to High"
                        : "High to Low"}
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 text-sm font-semibold transition-colors"
                  >
                    <FaTimes />
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <p className="text-neutral-600 dark:text-neutral-400">
                Showing{" "}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {tickets.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {totalTickets}
                </span>{" "}
                tickets
                {currentPage > 1 && (
                  <span className="ml-2 text-sm">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </p>
              {tickets.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <FaTicketAlt className="text-primary-500" />
                  <span>Found {totalTickets} tickets</span>
                </div>
              )}
            </div>
          </div>

          {/* Tickets Grid */}
          {tickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {tickets.map((ticket, index) => (
                <TicketCard key={ticket._id} ticket={ticket} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="card-premium p-12 max-w-md mx-auto">
                <FaTicketAlt className="text-6xl text-neutral-400 mx-auto mb-6" />
                <h3 className="heading-3 text-neutral-800 dark:text-neutral-200 mb-4">
                  No Tickets Found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We couldn't find any tickets matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <button onClick={clearFilters} className="btn-primary-custom">
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === 1
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
              >
                <FaChevronLeft className="mr-2" />
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                        currentPage === pageNum
                          ? "bg-primary-500 text-white shadow-soft"
                          : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === totalPages
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
              >
                Next
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTickets;
