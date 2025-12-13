import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaUser,
  FaTicketAlt,
  FaChartBar,
  FaPlusCircle,
  FaHistory,
} from "react-icons/fa";
import useRole from "../hooks/useRole"; 
import React from "react";
import { FaBus } from "react-icons/fa6";


const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const { role, isLoading } = useRole();


  let sidebarItems;

  if (role === "admin") {
    sidebarItems = (
      <>
        <li>
          <Link to="profile">
            <FaUser /> Admin Profile
          </Link>
        </li>
        <li>
          <Link to="manage-tickets">
            <FaTicketAlt /> Manage Tickets
          </Link>
        </li>
        <li>
          <Link to="manage-users">
            <FaUser /> Manage Users
          </Link>
        </li>
        <li>
          <Link to="advertise-tickets">
            <FaChartBar /> Advertise Tickets
          </Link>
        </li>
      </>
    );
  } else if (role === "vendor") {
    sidebarItems = (
      <>
        <li>
          <Link to="profile">
            <FaUser /> Vendor Profile
          </Link>
        </li>
        <li>
          <Link to="add-ticket">
            <FaPlusCircle /> Add Ticket
          </Link>
        </li>
        <li>
          <Link to="my-added-tickets">
            <FaTicketAlt /> My Added Tickets
          </Link>
        </li>
        <li>
          <Link to="requested-bookings">
            <FaTicketAlt /> Requested Bookings
          </Link>
        </li>
      </>
    );
  } else {
    sidebarItems = (
      <>
        <li>
          <Link to="profile">
            <FaUser /> User Profile
          </Link>
        </li>
        <li>
          <Link to="my-bookings">
            <FaTicketAlt /> My Booked Tickets
          </Link>
        </li>
        <li>
          <Link to="transaction-history">
            <FaHistory /> Transaction History
          </Link>
        </li>
      </>
    );
  }

  if (isLoading)
    return (
      <span className="loading loading-lg loading-spinner fixed inset-0 m-auto"></span>
    );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col p-4 bg-gray-50">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Sidebar
        </label>
        <div className="p-4 bg-white rounded-lg shadow-md min-h-screen">
          <Outlet /> 
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="mb-4 p-4 border-b">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-sm capitalize">Role: {role}</p>
          </div>

          {sidebarItems}

          <div className="divider"></div>
          <li>
            <Link to="/">
              <FaBus /> Back to Site
            </Link>
          </li>
          <li>
            <button onClick={logOut}>
              <FaUser /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
