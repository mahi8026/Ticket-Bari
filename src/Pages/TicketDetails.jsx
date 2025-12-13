import { useParams, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookingModal from "../components/BookingModal";
import Countdown from 'react-countdown'; // Requires: npm install react-countdown
import { FaBus, FaClock, FaCalendarAlt, FaDollarSign, FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import React from 'react';
// Renderer component for react-countdown
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-xl font-bold text-red-600">DEPARTED!</span>;
    } else {
      return (
        <span className="text-lg font-mono text-success">
          {days}d {hours}h {minutes}m {seconds}s remaining
        </span>
      );
    }
};

const TicketDetails = () => {
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch single ticket data
    const { data: ticket = {}, isLoading, refetch } = useQuery({
        queryKey: ['ticketDetails', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/tickets/${id}`);
            return res.data;
        }
    });

    if (isLoading || loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (!ticket || !ticket._id) {
        // Handle case where ticket is not found or not approved
        return <div className="text-center p-20 text-error">404 | Ticket Not Found or Unauthorized Access.</div>;
    }
    
    // Logic for button disabling
    const departureTime = new Date(ticket.departureDate).getTime();
    const hasDeparted = departureTime < Date.now();
    const isSoldOut = ticket.quantity <= 0;
    const isBookDisabled = hasDeparted || isSoldOut || !user;

    return (
        <div className="container mx-auto p-4">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <figure className="lg:w-1/3 min-h-60"><img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" /></figure>
                
                <div className="card-body lg:w-2/3">
                    <h1 className="card-title text-4xl font-extrabold text-primary">{ticket.title}</h1>
                    
                    <div className="my-4 space-y-2">
                        <p className="flex items-center text-lg"><FaMapMarkerAlt className="mr-2 text-warning"/> **Route:** {ticket.from} → {ticket.to}</p>
                        <p className="flex items-center text-lg"><FaBus className="mr-2 text-info"/> **Transport Type:** {ticket.transportType}</p>
                        <p className="flex items-center text-xl font-bold text-success"><FaDollarSign className="mr-2"/> **Price (per unit):** ${ticket.price}</p>
                        <p className="flex items-center text-md">**Available Seats:** <span className={`ml-2 font-bold ${isSoldOut ? 'text-red-500' : 'text-green-500'}`}>{ticket.quantity}</span></p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold flex items-center mb-2"><FaTags className="mr-2 text-secondary"/> Perks/Amenities:</h3>
                        <div className="flex flex-wrap gap-2">
                            {ticket.perks?.map((perk, index) => (
                                <span key={index} className="badge badge-lg badge-outline badge-secondary">{perk}</span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-2xl font-semibold flex items-center mb-2"><FaCalendarAlt className="mr-2 text-accent"/> Departure Time:</h3>
                        <p className="text-lg font-mono">{new Date(departureTime).toLocaleString()}</p>
                        <div className="mt-2 flex items-center">
                            <FaClock className="mr-2 text-xl text-primary"/> 
                            <Countdown date={departureTime} renderer={countdownRenderer} />
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        {!user && <p className="text-red-500">Please login to book tickets.</p>}
                        <button 
                            className="btn btn-lg btn-primary" 
                            onClick={() => setIsModalOpen(true)}
                            disabled={isBookDisabled}
                        >
                            {hasDeparted ? 'DEPARTED (Disabled)' : isSoldOut ? 'SOLD OUT' : 'Book Now'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal 
                ticket={ticket} 
                isOpen={isModalOpen} 
                closeModal={() => setIsModalOpen(false)}
                refetchTickets={refetch} // Pass refetch function
            />
        </div>
    );
};

export default TicketDetails;