import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const statCards = [
    {
      icon: FaDollarSign,
      title: "Total Revenue",
      value: `$${stats.totalRevenue || "0.00"}`,
      style: "bg-primary",
    },
    {
      icon: FaUsers,
      title: "Total Users",
      value: stats.totalUsers || 0,
      style: "bg-info",
    },
    {
      icon: FaTicketAlt,
      title: "Total Tickets",
      value: stats.totalTickets || 0,
      style: "bg-warning",
    },
    {
      icon: FaClipboardList,
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      style: "bg-secondary",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Welcome Back, {user?.displayName || "Admin"}!
      </h2>
      <p className="text-xl text-gray-600 mb-8">Dashboard Overview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`card card-compact shadow-xl text-white ${card.style}`}
          >
            <div className="card-body items-center text-center">
              <card.icon className="text-4xl mb-2" />
              <h2 className="card-title text-3xl">{card.value}</h2>
              <p className="text-sm opacity-90">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminHome;
