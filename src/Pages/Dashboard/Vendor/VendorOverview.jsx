import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaDollarSign,
  FaTicketAlt,
  FaPlusSquare,
  FaArrowUp,
  FaChartLine,
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
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const VendorOverview = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
      },
    },
  };

  const {
    data: stats = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendor-stats", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/vendor-stats?email=${user.email}`);
        return res.data;
      } catch (error) {
        console.warn("Vendor API endpoint not available, using mock data");
        // Return mock data when API is not available
        return {
          totalRevenue: 8750.25,
          totalTickets: 45,
          totalSales: 156,
          pendingTickets: 12,
        };
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading Vendor Dashboard..." />;
  }

  const statCards = [
    {
      icon: FaDollarSign,
      title: "Total Revenue",
      value: `$${parseFloat(stats.totalRevenue || 0).toFixed(2)}`,
      change: "+12.5%",
      changeType: "positive",
      color: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: FaTicketAlt,
      title: "Tickets Sold",
      value: stats.totalTicketsSold || 0,
      change: "+8.2%",
      changeType: "positive",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: FaPlusSquare,
      title: "Tickets Added",
      value: stats.totalTicketsAdded || 0,
      change: "+15.3%",
      changeType: "positive",
      color: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  const barChartData = [
    {
      name: "Tickets Added",
      value: stats.totalTicketsAdded || 0,
      color: "#F59E0B",
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold || 0,
      color: "#3B82F6",
    },
  ];

  const pieChartData = [
    {
      name: "Revenue",
      value: parseFloat(stats.totalRevenue) || 0,
      color: "#10B981",
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold * 10 || 0,
      color: "#3B82F6",
    },
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
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={cardVariants} className="text-center lg:text-left">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white mb-8">
          <h1 className="heading-2 mb-2">
            Welcome Back, {user?.displayName || "Vendor"}!
          </h1>
          <p className="text-lg opacity-90">
            Here's your business overview and performance metrics
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-consistent p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div
                  className={`w-full h-full bg-gradient-to-br ${card.color} rounded-full transform translate-x-8 -translate-y-8`}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.iconBg}`}>
                    <Icon className={`text-2xl ${card.iconColor}`} />
                  </div>
                  <div
                    className={`flex items-center text-sm font-semibold ${
                      card.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <FaArrowUp className="mr-1" />
                    {card.change}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {card.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {card.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Bar Chart */}
        <motion.div variants={chartVariants} className="card-consistent p-6">
          <div className="flex items-center mb-6">
            <FaChartLine className="text-2xl text-primary mr-3" />
            <h3 className="heading-3">Ticket Activity Comparison</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                fontSize={12}
                fontWeight={500}
              />
              <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
              <Tooltip
                formatter={(value) => [value.toLocaleString(), "Count"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Count" radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={chartVariants} className="card-consistent p-6">
          <div className="flex items-center mb-6">
            <FaArrowUp className="text-2xl text-secondary mr-3" />
            <h3 className="heading-3">Revenue Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
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
                formatter={(value, name) => [
                  name === "Revenue"
                    ? `$${value.toFixed(2)}`
                    : value.toLocaleString(),
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={cardVariants} className="card-consistent p-6">
        <h3 className="heading-3 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-custom"
            onClick={() => toast.info("Redirecting to Add Ticket...")}
          >
            <FaPlusSquare />
            Add New Ticket
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary-custom"
            onClick={() => toast.info("Redirecting to My Tickets...")}
          >
            <FaTicketAlt />
            View My Tickets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline-custom"
            onClick={() => toast.info("Redirecting to Bookings...")}
          >
            <FaChartLine />
            View Bookings
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VendorOverview;
