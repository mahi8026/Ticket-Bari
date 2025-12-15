import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["vendorTickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteTicket = (ticket) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the ticket: ${ticket.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tickets/${ticket._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${ticket.title} has been removed.`,
                icon: "success",
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Deletion failed:", error);
            Swal.fire("Error", "Failed to delete ticket.", "error");
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        My Added Tickets ({tickets.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <th>{index + 1}</th>
                <td>{ticket.title}</td>
                <td>{ticket.transportType}</td>
                <td>${parseFloat(ticket.price).toFixed(2)}</td>
                <td>{ticket.seatsAvailable}</td>
                <td>
                  <span
                    className={`badge text-white ${
                      ticket.status === "approved"
                        ? "badge-success"
                        : ticket.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info tooltip"
                    data-tip="Edit (Coming soon)"
                    disabled
                  >
                    <FaEdit />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteTicket(ticket)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tickets.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-500">
          You haven't added any tickets yet.
        </p>
      )}
    </div>
  );
};

export default MyAddedTickets;
