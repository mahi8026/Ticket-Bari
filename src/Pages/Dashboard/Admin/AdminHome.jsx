
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"; 

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
      value: `$${parseFloat(stats.totalRevenue).toFixed(2) || "0.00"}`,
      style: "bg-primary",
      color: "#377cfc", // Primary color for charts
    },
    {
      icon: FaUsers,
      title: "Total Users",
      value: stats.totalUsers || 0,
      style: "bg-info",
      color: "#3abff8", // Info color
    },
    {
      icon: FaTicketAlt,
      title: "Total Tickets",
      value: stats.totalTickets || 0,
      style: "bg-warning",
      color: "#fbbd23", // Warning color
    },
    {
      icon: FaClipboardList,
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      style: "bg-secondary",
      color: "#f6d860", // Secondary color
    },
  ];

  // Data for the Bar Chart
  const barChartData = [
    { name: "Users", value: stats.totalUsers || 0, color: statCards[1].color },
    {
      name: "Tickets",
      value: stats.totalTickets || 0,
      color: statCards[2].color,
    },
    {
      name: "Bookings",
      value: stats.totalBookings || 0,
      color: statCards[3].color,
    },
  ];

  // Data for the Pie Chart (Example: using existing data for illustration)
  const pieChartData = [
    {
      name: "Revenue",
      value: parseFloat(stats.totalRevenue) || 0,
      color: statCards[0].color,
    },
    {
      name: "Bookings Count",
      value: stats.totalBookings * 10 || 0,
      color: statCards[3].color,
    }, // Just an arbitrary comparison for now
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Welcome Back, {user?.displayName || "Admin"}! 
      </h2> <p className="text-xl text-gray-600 mb-8">Dashboard Overview</p>
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
      {/* 2. CHARTS SECTION */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Comparison of Total Counts */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            System Totals Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip
                formatter={(value) => value.toLocaleString()}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Total Count" fill={statCards[1].color}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Revenue Distribution (Placeholder/Example) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Revenue/Booking Distribution (Example)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
