import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    refetch,
    isLoading: bookingsLoading,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteBooking = (booking) => {
    if (booking.status === "paid") {
      Swal.fire(
        "Action Blocked",
        "Paid bookings cannot be cancelled via this interface.",
        "warning"
      );
      return;
    }

    const actionText =
      booking.status === "approved"
        ? "This will cancel your approved reservation."
        : `You want to cancel the booking for ${booking.title}?`;

    Swal.fire({
      title: "Are you sure?",
      text: actionText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: `Your booking for ${booking.title} has been cancelled.`,
              icon: "success",
              timer: 1500,
            });
          }
        });
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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        My Bookings ({bookings.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => {
              const statusColor =
                booking.status === "paid"
                  ? "badge-success"
                  : booking.status === "approved"
                  ? "badge-info"
                  : booking.status === "rejected"
                  ? "badge-error"
                  : "badge-warning";

              return (
                <tr key={booking._id}>
                  <td>{booking.title}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.quantity}</td>
                  <td>${parseFloat(booking.totalPrice).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${statusColor} text-white`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="font-mono text-xs">
                    {booking.transactionId || "N/A"}
                  </td>
                  <td>
                    {booking.status === "approved" ? (
                      <Link
                        to="/dashboard/payment"
                        state={{ booking: booking }}
                        className="btn btn-sm btn-info text-white"
                      >
                        Pay Now
                      </Link>
                    ) : booking.status !== "paid" ? (
                      <button
                        onClick={() => handleDeleteBooking(booking)}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-success text-sm font-semibold">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-500">
          You have no active bookings.
        </p>
      )}
    </div>
  );
};

export default MyBookings;
