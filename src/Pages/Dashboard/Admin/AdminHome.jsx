import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaClipboardList,
  FaArrowUp,
  FaChartLine,
  FaCog,
  FaUserShield,
  FaEye,
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

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
    hidden: { opacity: 0, scale: 0.9 },
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
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/admin/stats");
        return res.data;
      } catch (error) {
        console.warn(
          "Admin API endpoint not available, using mock data for development"
        );
        return {
          totalRevenue: 15420.5,
          totalUsers: 1250,
          totalTickets: 89,
          totalBookings: 342,
        };
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const statCards = [
    {
      icon: FaDollarSign,
      title: "Total Revenue",
      value: `$${parseFloat(stats.totalRevenue || 0).toFixed(2)}`,
      change: "+15.3%",
      changeType: "positive",
      color: "from-primary-500 to-primary-600",
      iconBg: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-600 dark:text-primary-400",
    },
    {
      icon: FaUsers,
      title: "Total Users",
      value: stats.totalUsers || 0,
      change: "+12.5%",
      changeType: "positive",
      color: "from-secondary-500 to-secondary-600",
      iconBg: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-600 dark:text-secondary-400",
    },
    {
      icon: FaTicketAlt,
      title: "Total Tickets",
      value: stats.totalTickets || 0,
      change: "+8.7%",
      changeType: "positive",
      color: "from-accent-500 to-accent-600",
      iconBg: "bg-accent-100 dark:bg-accent-900/30",
      iconColor: "text-accent-600 dark:text-accent-400",
    },
    {
      icon: FaClipboardList,
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      change: "+5.2%",
      changeType: "positive",
      color: "from-success-500 to-success-600",
      iconBg: "bg-success-100 dark:bg-success-900/30",
      iconColor: "text-success-600 dark:text-success-400",
    },
  ];

  const barChartData = [
    { name: "Revenue", value: parseFloat(stats.totalRevenue || 0) },
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Tickets", value: stats.totalTickets || 0 },
    { name: "Bookings", value: stats.totalBookings || 0 },
  ];

  const pieChartData = [
    {
      name: "Revenue",
      value: parseFloat(stats.totalRevenue || 0),
      color: "#0066FF",
    },
    {
      name: "Bookings Value",
      value: (stats.totalBookings || 0) * 50,
      color: "#00D4AA",
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
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const recentActivities = [
    { action: "New user registration", type: "user", time: "2 minutes ago" },
    {
      action: "Ticket booking completed",
      type: "booking",
      time: "5 minutes ago",
    },
    {
      action: "New ticket added by vendor",
      type: "ticket",
      time: "10 minutes ago",
    },
    {
      action: "Payment processed successfully",
      type: "payment",
      time: "15 minutes ago",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={cardVariants} className="text-center mb-8">
        <div className="gradient-primary rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-5xl font-bold font-display mb-3 text-white">
                Welcome Back, {user?.displayName || "Admin"}! 👋
              </h1>
              <p className="text-xl text-white/90 font-medium">
                System Overview & Analytics Dashboard
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="badge-info bg-white/20 text-white border-white/30">
                  <FaUserShield className="w-3 h-3" />
                  Administrator
                </div>
                <div className="text-sm text-white/80">
                  Last login: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaUserShield className="text-4xl text-white/80" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-premium hover-glow group"
            >
              <div
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white relative overflow-hidden h-full`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-4 rounded-2xl ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`text-2xl ${card.iconColor}`} />
                    </div>
                    <div
                      className={`text-sm px-3 py-2 rounded-full font-semibold ${
                        card.changeType === "positive"
                          ? "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300"
                          : "bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300"
                      } backdrop-blur-sm`}
                    >
                      <FaArrowUp className="inline mr-1 w-3 h-3" />
                      {card.change}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold font-display mb-2 text-white">
                    {card.value}
                  </h3>
                  <p className="text-white/90 font-medium">{card.title}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        {/* Bar Chart */}
        <motion.div variants={chartVariants} className="card-premium">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl mr-4">
                <FaChartLine className="text-2xl text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="heading-4 text-neutral-800 dark:text-neutral-200">
                  System Overview
                </h3>
                <p className="text-caption">
                  Performance metrics across all categories
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: "#64748B" }}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: "#64748B" }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "Revenue"
                      ? `$${value.toFixed(2)}`
                      : `${value.toLocaleString()}`,
                    "Total Count",
                  ]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
                    paddingTop: "12px",
                    color: "#1E293B",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Total Count"
                  fill="#0066FF"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={chartVariants} className="card-premium">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl mr-4">
                <FaArrowUp className="text-2xl text-secondary-600 dark:text-secondary-400" />
              </div>
              <div>
                <h3 className="heading-4 text-neutral-800 dark:text-neutral-200">
                  Revenue Distribution
                </h3>
                <p className="text-caption">Breakdown of revenue sources</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    name === "Revenue"
                      ? `$${value.toFixed(2)}`
                      : `$${value.toLocaleString()}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
                    color: "#1E293B",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Activity */}
        <motion.div variants={cardVariants} className="card-premium">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl mr-4">
                <FaClipboardList className="text-2xl text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <h3 className="heading-4 text-neutral-800 dark:text-neutral-200">
                  Recent System Activity
                </h3>
                <p className="text-caption">Latest system events and updates</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
                >
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "user"
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                        : activity.type === "booking"
                        ? "bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400"
                        : activity.type === "ticket"
                        ? "bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400"
                        : "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400"
                    }`}
                  >
                    {activity.type === "user" ? (
                      <FaUsers className="w-4 h-4" />
                    ) : activity.type === "booking" ? (
                      <FaClipboardList className="w-4 h-4" />
                    ) : activity.type === "ticket" ? (
                      <FaTicketAlt className="w-4 h-4" />
                    ) : (
                      <FaDollarSign className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">
                      {activity.action}
                    </p>
                    <span className="text-caption">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={cardVariants} className="card-premium">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-xl mr-4">
                <FaCog className="text-2xl text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="heading-4 text-neutral-800 dark:text-neutral-200">
                  Admin Quick Actions
                </h3>
                <p className="text-caption">
                  Frequently used administrative tools
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.info("Redirecting to Manage Users...")}
                className="btn-primary-custom"
              >
                <FaUsers className="w-4 h-4" />
                Manage Users
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.info("Redirecting to Manage Tickets...")}
                className="btn-secondary-custom"
              >
                <FaTicketAlt className="w-4 h-4" />
                Manage Tickets
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.info("Redirecting to View Reports...")}
                className="btn-outline-custom"
              >
                <FaEye className="w-4 h-4" />
                View Reports
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.info("Redirecting to Settings...")}
                className="btn-accent-custom"
              >
                <FaCog className="w-4 h-4" />
                Settings
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminHome;
