import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import SEOHead from "../components/SEO/SEOHead";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
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
  FaRocket,
  FaThLarge,
  FaList,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

const AllTickets = () => {
  const [rawSearchInput, setRawSearchInput] = useState("");
  const [effectiveSearchQuery, setEffectiveSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

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
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };

        if (effectiveSearchQuery) {
          params.search = effectiveSearchQuery;
        }
        if (filterType) {
          params.filter = filterType;
        }
        if (sortOrder) {
          params.sort = sortOrder;
        }

        const res = await axios.get(
          "https://ticket-bari-server-pi.vercel.app/tickets",
          { params }
        );

        return res.data;
      } catch (error) {
        console.error("API Error:", error);
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
      toast.success(`Searching for "${rawSearchInput}"...`);
    }
  };

  const handleFilterChange = (e) => {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    setCurrentPage(1);
    setEffectiveSearchQuery(rawSearchInput);
    if (newFilterType) {
      toast.success(
        `Filtering by ${
          transportData[newFilterType]?.label || newFilterType
        } tickets`
      );
    }
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    setEffectiveSearchQuery(rawSearchInput);
    if (newSortOrder) {
      toast.success("Tickets sorted successfully");
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
    toast.success("All filters cleared!");
  };

  const transportData = {
    Bus: {
      icon: FaBus,
      label: "Bus",
    },
    Train: {
      icon: FaTrain,
      label: "Train",
    },
    Launch: {
      icon: FaShip,
      label: "Launch",
    },
    Flight: {
      icon: FaPlane,
      label: "Flight",
    },
  };

  if (isLoading) {
    return <LoadingSpinner message="Finding Your Perfect Journey" />;
  }

  if (error) {
    return (
      <LoadingSpinner
        type="page"
        message="Something went wrong. Please try again."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="All Tickets - TicketBari"
        description={`Discover ${totalTickets} amazing travel experiences across Bangladesh. Find bus, train, launch, and flight tickets with unbeatable prices.`}
        keywords="all tickets, bus tickets, train tickets, flight tickets, launch tickets, Bangladesh travel"
        url="/tickets"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Search Interface */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Search Bar */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Where do you want to go? (e.g., Dhaka to Cox's Bazar)"
                      className="w-full h-10 pl-12 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500"
                      value={rawSearchInput}
                      onChange={(e) => setRawSearchInput(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    <FaRocket />
                    Search
                  </button>
                </form>
              </div>

              {/* Filters */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full h-10 pl-12 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white appearance-none"
                    value={filterType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Transport Types</option>
                    {Object.entries(transportData).map(([type, data]) => (
                      <option key={type} value={type}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full h-10 pl-12 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white appearance-none"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="">Sort by Price</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(effectiveSearchQuery || filterType || sortOrder) && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Filters:
                  </span>

                  {effectiveSearchQuery && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      <FaMapMarkerAlt />"{effectiveSearchQuery}"
                    </span>
                  )}

                  {filterType && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {React.createElement(
                        transportData[filterType]?.icon || FaTicketAlt
                      )}
                      {transportData[filterType]?.label || filterType}
                    </span>
                  )}

                  {sortOrder && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      <FaSort />
                      {sortOrder.includes("asc")
                        ? "Low to High"
                        : "High to Low"}
                    </span>
                  )}

                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-full text-sm transition-colors"
                  >
                    <FaTimes />
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="bg-white dark:bg-gray-800 p-2 px-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tickets.length} of {totalTickets} Tickets Found
                </h3>
                {currentPage > 1 && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>

              {tickets.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                      <FaTicketAlt className="inline mr-1" />
                      {totalTickets} Available
                    </span>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tickets Display */}
          {tickets.length > 0 ? (
            <div
              className={`mb-12 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  : "space-y-6"
              }`}
            >
              {tickets.map((ticket, index) => (
                <div
                  key={ticket._id}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <TicketCard ticket={ticket} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <FaRocket className="text-6xl text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Tickets Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We couldn't find any tickets matching your search. Try
                  adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <FaRocket className="mr-2 inline" />
                  Explore All Tickets
                </button>
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                }`}
              >
                <FaChevronLeft className="mr-2" />
                Previous
              </button>

              <div className="flex gap-2">
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
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
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
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
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
