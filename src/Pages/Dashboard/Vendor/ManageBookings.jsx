import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";



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
      confirmButtonColor: newStatus === "approved" ? "#38a169" : "#e53e3e",
      cancelButtonColor: "#718096",
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
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const pendingBookings = vendorBookings.filter((b) => b.status === "pending");
  const allOtherBookings = vendorBookings.filter((b) => b.status !== "pending");

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Vendor Booking Management</h2>

      <h3 className="text-2xl font-semibold mb-4 text-warning-content">
        Waiting for Approval ({pendingBookings.length})
      </h3>
      <BookingTable
        bookings={pendingBookings}
        handleStatusUpdate={handleStatusUpdate}
        isActionable={true}
      />

      <h3 className="text-2xl font-semibold mb-4 mt-8">
        Processed Bookings ({allOtherBookings.length})
      </h3>
      <BookingTable
        bookings={allOtherBookings}
        handleStatusUpdate={handleStatusUpdate}
        isActionable={false}
      />

      {vendorBookings.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-500">
          You have no bookings for your tickets yet.
        </p>
      )}
    </div>
  );
};

const BookingTable = ({ bookings, handleStatusUpdate, isActionable }) => {
  return (
    <div className="overflow-x-auto shadow-xl rounded-lg mb-8">
      <table className="table w-full">
        <thead className="bg-base-300 text-gray-700">
          <tr>
            <th>#</th>
            <th>Ticket Title</th>
            <th>User Email</th>
            <th>Date</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            {isActionable && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => {
            const statusColor =
              booking.status === "paid"
                ? "badge-success"
                : booking.status === "approved"
                ? "badge-info"
                : booking.status === "rejected"
                ? "badge-error"
                : "badge-warning"; // pending

            return (
              <tr
                key={booking._id}
                className={booking.status === "paid" ? "bg-green-50" : ""}
              >
                <th>{index + 1}</th>
                <td>{booking.title}</td>
                <td>{booking.userEmail}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.quantity}</td>
                <td>${parseFloat(booking.totalPrice).toFixed(2)}</td>
                <td>
                  <span className={`badge ${statusColor} text-white`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                {isActionable && (
                  <td>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          booking._id,
                          "approved",
                          booking.title
                        )
                      }
                      className="btn btn-xs btn-success text-white mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          booking._id,
                          "rejected",
                          booking.title
                        )
                      }
                      className="btn btn-xs btn-error text-white"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
