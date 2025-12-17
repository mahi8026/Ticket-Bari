import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaDollarSign, FaTicketAlt, FaPlusSquare } from "react-icons/fa";
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


const VendorOverview = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["vendor-stats", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-stats?email=${user.email}`);
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
      value: `$${parseFloat(stats.totalRevenue || 0).toFixed(2)}`,
      style: "bg-success",
      color: "#36D399", 
    },
    {
      icon: FaTicketAlt,
      title: "Tickets Sold",
      value: stats.totalTicketsSold || 0,
      style: "bg-info",
      color: "#3ABFF8", 
    },
    {
      icon: FaPlusSquare,
      title: "Tickets Added",
      value: stats.totalTicketsAdded || 0,
      style: "bg-primary",
      color: "#7C3AED", 
    },
  ];

  const barChartData = [
    {
      name: "Tickets Added",
      value: stats.totalTicketsAdded || 0,
      color: statCards[2].color,
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold || 0,
      color: statCards[1].color,
    },
  ];

  const pieChartData = [
    {
      name: "Total Revenue",
      value: parseFloat(stats.totalRevenue) || 0,
      color: statCards[0].color,
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold * 10 || 0, 
      color: statCards[1].color,
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
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Welcome Back, {user?.displayName || "Vendor"}!
      </h2>
      <p className="text-xl text-gray-600 mb-8">Revenue Overview</p>

      {/* 1. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Ticket Activity Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="value" name="Count">
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Revenue Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Revenue & Sales Weight (Example)
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
                formatter={(value, name) => [
                  name === "Total Revenue"
                    ? `$${value.toFixed(2)}`
                    : value.toLocaleString(),
                  name,
                ]}
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

export default VendorOverview;
