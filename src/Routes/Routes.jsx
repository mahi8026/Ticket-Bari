import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
// Public Pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllTickets from "../Pages/AllTickets";
import TicketDetails from "../Pages/TicketDetails";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Help from "../Pages/Help";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets";

import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";

// User Pages
import MyBookings from "../Pages/Dashboard/User/MyBookings";
import UserProfile from "../Pages/Dashboard/User/UserProfile";

// Demo Components
import AnimationDemo from "../components/Demo/AnimationDemo";

// Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Payment from "../Pages/Dashboard/User/Payment";
import ManageBookings from "../Pages/Dashboard/Vendor/ManageBookings";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";

import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import VendorProfile from "../Pages/Dashboard/Vendor/VendorProfile";
import VendorOverview from "../Pages/Dashboard/Vendor/VendorOverview";

const DefaultDashboardRoute = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <Navigate to="/dashboard/admin-profile" replace />;
  }
  if (role === "vendor") {
    return <Navigate to="/dashboard/vendor-overview" replace />;
  }

  return <Navigate to="/dashboard/profile" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "tickets", element: <AllTickets /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "help", element: <Help /> },
      { path: "demo", element: <AnimationDemo /> },
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
      {
        index: true,
        element: <DefaultDashboardRoute />,
      },
      // --- User Routes
      {
        path: "my-bookings",
        element: <MyBookings />,
      },

      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },

      // --- Vendor Routes ---
      {
        path: "vendor-profile",
        element: (
          <VendorRoute>
            <VendorProfile></VendorProfile>
          </VendorRoute>
        ),
      },
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
        path: "manage-bookings",
        element: (
          <VendorRoute>
            <ManageBookings />
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
            <ManageBookings />
          </VendorRoute>
        ),
      },
      {
        path: "vendor-overview",
        element: (
          <VendorRoute>
            <VendorOverview></VendorOverview>
          </VendorRoute>
        ),
      },

      // --- Admin Routes ---

      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
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
            <AdvertiseTickets></AdvertiseTickets>
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
