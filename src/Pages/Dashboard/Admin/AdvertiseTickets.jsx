import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [advertisedCount, setAdvertisedCount] = useState(0);

    const {
        data: tickets = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["approvedTicketsForAdvertise"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets/approved");
            return res.data;
        },
    });
    
    useEffect(() => {
        const count = tickets.filter(t => t.isAdvertised).length;
        setAdvertisedCount(count);
    }, [tickets]);

    const handleAdvertiseToggle = async (ticket) => {
        const newAdvertiseState = !ticket.isAdvertised;
        const currentAdvertisedCount = tickets.filter(t => t.isAdvertised).length;

        if (newAdvertiseState && currentAdvertisedCount >= 6) {
            return Swal.fire({
                icon: 'error',
                title: 'Limit Reached',
                text: 'You cannot advertise more than 6 tickets at a time. Please un-advertise an existing ticket first.',
            });
        }

        const actionVerb = newAdvertiseState ? "Advertise" : "Unadvertise";

        try {
            const res = await axiosSecure.patch(`/tickets/advertise/${ticket._id}`, {
                isAdvertised: newAdvertiseState,
            });

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: `${actionVerb}d!`,
                    text: `Ticket status updated to ${actionVerb}.`,
                    icon: "success",
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire(
                "Error",
                `Failed to update advertising status: ${error.message}`,
                "error"
            );
        }
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

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Advertise Tickets</h2>
            <div className="alert shadow-lg mb-6 bg-info text-white">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>
                        **Advertising Limit:** You have **{advertisedCount} out of 6** slots used for homepage advertisement. Only Admin-approved tickets are shown below.
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto shadow-xl rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-300 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Price ($)</th>
                            <th>Status</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id} className={ticket.isAdvertised ? "bg-green-50" : ""}>
                                <th>{index + 1}</th>
                                <td>{ticket.title}</td>
                                <td>{ticket.operatorName}</td>
                                <td>{ticket.price}</td>
                                <td>
                                    <span className={`badge ${ticket.isAdvertised ? 'badge-success' : 'badge-ghost'}`}>
                                        {ticket.isAdvertised ? "ADVERTISED" : "NOT ADVERTISED"}
                                    </span>
                                </td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        className="toggle toggle-success"
                                        checked={ticket.isAdvertised}
                                        onChange={() => handleAdvertiseToggle(ticket)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseTickets;