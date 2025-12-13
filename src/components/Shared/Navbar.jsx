import React from "react";
import { Link, useLocation } from "react-router-dom";
// *** FIX APPLIED HERE: Changed import from 'react-icons/fa6' to 'react-icons/fa' ***
import {
  FaBus,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaTicketAlt,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

// Mock user state for demonstration (Replace with actual useAuth() hook)
const mockUser = {
  displayName: "A. Vendor",
  email: "vendor@example.com",
  role: "vendor", // or 'admin', 'user'
  photoURL:
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
};
// const mockUser = null; // Use this line to test the logged-out state

const Navbar = () => {
  // Replace with your actual authentication hook
  const user = mockUser; // Set to mockUser or null based on test
  const userRole = user ? user.role : null;
  const location = useLocation();

  // Define the path for the dashboard based on the user's role
  const dashboardPath =
    userRole === "admin"
      ? "/dashboard/adminhome"
      : userRole === "vendor"
      ? "/dashboard/vendorhome"
      : "/dashboard/userhome";

  // Helper to determine if a link is active
  const isActive = (path) =>
    location.pathname === path
      ? "text-primary border-b-2 border-primary"
      : "hover:text-primary";

  // Base Navigation Links (Desktop & Mobile)
  const navLinks = (
    <>
      <li>
        <Link to="/" className={isActive("/")}>
          <FaHome className="mr-1" /> Home
        </Link>
      </li>
      {/* All Tickets is private (only visible when logged in) */}
      {user && (
        <li>
          <Link to="/tickets" className={isActive("/tickets")}>
            <FaTicketAlt className="mr-1" /> All Tickets
          </Link>
        </li>
      )}
      {/* Dashboard is private (only visible when logged in) */}
      {user && (
        <li>
          <Link to={dashboardPath} className={isActive(dashboardPath)}>
            <FaTachometerAlt className="mr-1" /> Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <FaBus className="text-xl" />
            <span className="ml-2">TicketBari</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-gray-700 space-x-4">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
           
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
              
                <span className="hidden sm:inline font-bold mr-2 text-gray-800">
                  {user.displayName}
                </span>

                <div className="w-10 rounded-full avatar">
                  <img
                    alt={`${user.displayName}'s avatar`}
                    src={
                      user.photoURL ||
                      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-bold text-gray-800 px-4 py-2 pointer-events-none border-b border-gray-100">
                  {user.displayName}
                </li>

                {/* My Profile */}
                <li>
                  <Link to="/profile">
                    <FaUser /> My Profile
                  </Link>
                </li>
                {/* Logout */}
                <li>
                  <Link to="/logout" className="text-error">
                    <FaSignOutAlt /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm sm:btn-md btn-primary"
              >
                <FaSignInAlt className="mr-1" /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm sm:btn-md btn-primary hidden md:flex"
              >
                <FaUserPlus className="mr-1" /> Register
              </Link>
            </>
          )}

          
          <div className="lg:hidden dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <FaBars className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              <div className="divider m-0 h-px bg-gray-100"></div>
        
              {!user && (
                <>
                  <li>
                    <Link to="/login">
                      <FaSignInAlt className="mr-1" /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <FaUserPlus className="mr-1" /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
