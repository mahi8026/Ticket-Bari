import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaStore } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

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

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeVendor = (user) => {
    axiosSecure.patch(`/users/vendor/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Vendor Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMarkAsFraud = (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: `Vendor: ${user.name} will be marked as fraud. All their tickets will be hidden.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Mark Fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${user._id}`).then((res) => {
          if (res.data.userUpdateResult.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is now marked as FRAUD!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
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
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr> <th>#</th> <th>Name</th>
              <th>Email</th> <th>Role</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}> <th>{index + 1}</th>
                <td>{user.name}</td> <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "vendor"
                        ? "badge-secondary"
                        : "badge-ghost"
                    } ${user.role === "fraud" ? "badge-error" : ""}`}
                  > {user.role || "User"}
                  </span>
                </td>
                <td className="flex items-center gap-2">
                  {user.role !== "admin" && user.role !== "fraud" && (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm btn-circle btn-outline btn-primary tooltip"
                      data-tip="Make Admin"
                    > <FaUserShield className="text-lg" />
                    </button>
                  )}
                  {user.role !== "vendor" &&
                    user.role !== "admin" &&
                    user.role !== "fraud" && (
                      <button
                        onClick={() => handleMakeVendor(user)}
                        className="btn btn-sm btn-circle btn-outline btn-secondary tooltip"
                        data-tip="Make Vendor"
                      > <FaStore className="text-lg" />
                      </button>
                    )}
                  {user.role === "vendor" && (
                    <button
                      onClick={() => handleMarkAsFraud(user)}
                      className="btn btn-sm btn-error text-white tooltip"
                      data-tip="Mark Vendor as Fraud"
                    > Mark Fraud 
                    </button>
                  )}
                  {user.role === "fraud" && (
                    <span className="text-error font-bold">BANNED</span>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-ghost text-red-600 tooltip"
                    data-tip="Delete User"
                  > <FaTrashAlt className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

