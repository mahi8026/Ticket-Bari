import { createBrowserRouter } from "react-router-dom";
import React from "react";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Public Pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllTickets from "../Pages/AllTickets";
import TicketDetails from "../Pages/TicketDetails";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings";

import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";

// User Pages
import MyBookings from "../Pages/Dashboard/User/MyBookings";
import UserProfile from "../Pages/Dashboard/User/UserProfile"; // Create a basic profile page

// Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Payment from "../Pages/Dashboard/User/Payment";
import ManageBookings from "../Pages/Dashboard/Vendor/ManageBookings";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "tickets", element: <AllTickets /> },
      {
        path: "ticket/:id",
        element: (
          <PrivateRoute>
            <TicketDetails />
          </PrivateRoute>
        ), 
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // --- User Routes 
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "profile",
        element: <UserProfile />, 
      },

      // --- Vendor Routes ---
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "manage-tickets",
        element: <ManageTickets></ManageTickets>,
      },

      // --- Admin Routes ---
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ), 
      },
      {
        path: "advertise-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory />,
      },
    ],
  },
]);
