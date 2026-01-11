import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaUser,
  FaStore,
  FaTrashAlt,
  FaSearch,
  FaFilter,
  FaUsers,
  FaCrown,
  FaBan,
  FaSyncAlt,
} from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Simple filtering logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "user" && (!user.role || user.role === "user")) ||
        user.role === filter;

      const matchesSearch =
        searchTerm === "" ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [users, filter, searchTerm]);

  // Simple statistics
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const vendors = users.filter((u) => u.role === "vendor").length;
    const regularUsers = users.filter(
      (u) => !u.role || u.role === "user"
    ).length;

    return { total, admins, vendors, regularUsers };
  }, [users]);

  const getRoleIcon = (role) => {
    const iconMap = {
      admin: FaCrown,
      vendor: FaStore,
      fraud: FaBan,
      user: FaUser,
    };
    return iconMap[role] || FaUser;
  };

  const getRoleBadgeClass = (role) => {
    const classMap = {
      admin:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      vendor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      fraud: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      user: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
    return classMap[role] || classMap.user;
  };

  const handleMakeAdmin = async (user) => {
    const result = await Swal.fire({
      title: "Promote to Admin?",
      text: `Make ${user.name} an administrator?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      confirmButtonText: "Yes, Make Admin!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/admin/${user._id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user.name} is now an Admin!`);
        }
      } catch {
        toast.error(`Failed to promote ${user.name}`);
      }
    }
  };

  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `This will permanently delete ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${user._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success(`${user.name} has been deleted`);
        }
      } catch {
        toast.error(`Failed to delete ${user.name}`);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading user management..." />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Users
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user accounts and permissions
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaSyncAlt className="text-sm" />
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaUsers className="text-2xl text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaUser className="text-2xl text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular Users
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.regularUsers}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaCrown className="text-2xl text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.admins}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaStore className="text-2xl text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vendors
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stats.vendors}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white appearance-none min-w-[150px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="user">Regular Users</option>
              <option value="admin">Admins</option>
              <option value="vendor">Vendors</option>
              <option value="fraud">Fraud Users</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {filteredUsers.length} User(s) Found
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(
                          user.role
                        )}`}
                      >
                        <RoleIcon className="mr-1" />
                        {user.role?.toUpperCase() || "USER"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                          >
                            <FaCrown className="mr-1" />
                            Make Admin
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                        >
                          <FaTrashAlt className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter !== "all" || searchTerm
                ? "Try adjusting your filters or search terms."
                : "No users have been registered yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
