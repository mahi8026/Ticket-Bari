import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestedBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
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

  const handleUpdateStatus = (booking, newStatus) => {
   
    if (newStatus === "approved" && booking.status !== "pending") {
      Swal.fire(
        "Action Blocked",
        "Only pending bookings can be approved/rejected.",
        "warning"
      );
      return;
    }

    axiosSecure
      .patch(`/bookings/status/${booking._id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Booking ID ${
              booking._id
            } set to ${newStatus.toUpperCase()}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Error", "Failed to update booking status.", "error");
        }
      })
      .catch((error) => {
        console.error("Status update failed:", error);
        Swal.fire("Error", "Failed to communicate with the server.", "error");
      });
  };

  if (authLoading || bookingsLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending");

  const bookingsToDisplay = pendingBookings;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Requested Bookings ({bookingsToDisplay.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Ticket Title</th>
              <th>Booked By</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingsToDisplay.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.title}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.quantity}</td>
                <td>${parseFloat(booking.totalPrice).toFixed(2)}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge text-white ${
                      booking.status === "approved"
                        ? "badge-success"
                        : booking.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking, "approved")}
                        className="btn btn-sm btn-success text-white tooltip"
                        data-tip="Approve Request"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(booking, "rejected")}
                        className="btn btn-sm btn-error text-white tooltip"
                        data-tip="Reject Request"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookingsToDisplay.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-500">
          No pending booking requests found for your tickets.
        </p>
      )}
    </div>
  );
};

export default RequestedBookings;
