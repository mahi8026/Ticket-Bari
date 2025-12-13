import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TicketCard from "../components/TicketCard"; 
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";

const ITEMS_PER_PAGE = 6; // Requirement: 6-9 per page

const AllTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allTickets", searchQuery, filterType, sortOrder, currentPage],
    queryFn: async () => {
      const params = {
        search: searchQuery,
        filter: filterType,
        sort: sortOrder,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      };
      const res = await axios.get("http://localhost:5000/tickets", { params });
      return res.data;
    },
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 0;


  const handleSearch = (e) => {
    e.preventDefault();
   
    setCurrentPage(1);
    const form = e.target;
    setSearchQuery(form.search.value);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        🌍 All Approved Tickets
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <FaSearch className="text-xl text-primary" />
          <input
            type="text"
            name="search"
            placeholder="Search From/To Location..."
            className="input input-bordered w-full"
            defaultValue={searchQuery}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="flex items-center space-x-2">
          <FaFilter className="text-xl text-info" />
          <select
            className="select select-bordered w-full"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Filter by Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Launch">Launch</option>
            <option value="Plane">Plane</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <FaSort className="text-xl text-warning" />
          <select
            className="select select-bordered w-full"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Sort by Price</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <div className="col-span-full text-center p-10 bg-gray-100 rounded-lg">
            <p className="text-xl text-gray-600">
              No tickets found matching your criteria. Try adjusting the
              filters!
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            className="btn btn-outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
