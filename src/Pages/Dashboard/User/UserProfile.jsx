import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaHistory,
  FaSpinner,
  FaIdCard,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const API_BASE_URL = "https://ticket-bari-server-pi.vercel.app";

const UserProfile = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const userEmail = currentUser?.email;

  const {
    data: userProfile,
    isLoading: profileLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userEmail],
    enabled: !!userEmail && !authLoading,
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axios.get(
        `${API_BASE_URL}/users/profile/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white shadow-lg rounded-xl mt-10 max-w-4xl mx-auto">
        <FaSpinner className="animate-spin text-indigo-500 text-3xl mr-3" />
        <p className="text-xl text-gray-600">Loading User Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-50 border border-red-300 shadow-md rounded-xl mt-10">
        <h3 className="text-2xl font-bold text-red-700 flex items-center">
          <FaShieldAlt className="mr-3" /> Error Loading Profile
        </h3>
        <p className="text-red-600 mt-2">
          Could not fetch user data. Check server connection or authentication
          status.
        </p>
        <p className="text-sm italic mt-1">Error: {error.message}</p>
      </div>
    );
  }

  const {
    name,
    email,
    photo,
    role = "user",
  } = userProfile || { email: userEmail };

  const getRoleStyles = (userRole) => {
    switch (userRole) {
      case "admin":
        return { text: "text-red-700", bg: "bg-red-100", icon: "👑" };
      case "vendor":
        return { text: "text-green-700", bg: "bg-green-100", icon: "🎫" };
      default:
        return { text: "text-blue-700", bg: "bg-blue-100", icon: "👤" };
    }
  };

  const roleStyles = getRoleStyles(role);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-12 transform hover:shadow-indigo-300 transition duration-300">
      <div className="flex items-center space-x-5 mb-8 border-b pb-4">
        {photo ? (
          <img
            src={photo}
            alt={name || "User"}
            className="w-16 h-16 rounded-full object-cover border-4 border-indigo-200"
          />
        ) : (
          <FaUserCircle className="text-6xl text-indigo-500" />
        )}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            {name || "My Account"}
          </h2>
          <p className="text-gray-500">
            Manage your profile and account settings.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {name && (
          <div className="p-5 border border-gray-200 rounded-lg bg-gray-50 flex items-center shadow-sm">
            <FaIdCard className="text-2xl text-gray-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-xl font-semibold text-gray-800">{name}</p>
            </div>
          </div>
        )}

        <div className="p-5 border border-gray-200 rounded-lg bg-gray-50 flex items-center shadow-sm">
          <FaEnvelope className="text-2xl text-gray-500 mr-4" />
          <div>
            <p className="text-sm font-medium text-gray-500">Email Address</p>
            <p className="text-xl font-semibold text-gray-800">{email}</p>
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-lg bg-gray-50 flex items-center shadow-sm">
          <FaShieldAlt className={`text-2xl ${roleStyles.text} mr-4`} />
          <div>
            <p className="text-sm font-medium text-gray-500">Account Role</p>
            <div className="flex items-center space-x-2">
              <span
                className={`px-4 py-1.5 rounded-full text-base font-bold capitalize ${roleStyles.bg} ${roleStyles.text}`}
              >
                {roleStyles.icon} {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/dashboard/transaction-history"
            className="flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition duration-150 shadow-md"
          >
            <div className="flex items-center">
              <FaHistory className="mr-3 text-xl" />
              <span>View **Transaction History**</span>
            </div>
            &rarr;
          </Link>

          <Link
            to="/dashboard/edit-profile"
            className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition duration-150 shadow-md"
          >
            <div className="flex items-center">
              <FaUserCircle className="mr-3 text-xl" />
              <span>Edit **Personal Details**</span>
            </div>
            &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
