import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaTicketAlt,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role: userRole, isRoleLoading } = useRole();
  const location = useLocation();

  if (isRoleLoading) {
    return (
      <div className="navbar bg-base-100 shadow-lg h-20 flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    );
  }

  const dashboardPath =
    userRole === "admin"
      ? "/dashboard/adminhome"
      : userRole === "vendor"
      ? "/dashboard/vendorhome"
      : "/dashboard/userhome";

  const isActive = (path) =>
    location.pathname === path
      ? "text-primary border-b-2 border-primary"
      : "hover:text-primary";

  const navLinks = (
    <>
      <li>
        <Link to="/" className={isActive("/")}>
          <FaHome className="mr-1" /> Home
        </Link>
      </li>

      {user && (
        <>
          <li>
            <Link to="/tickets" className={isActive("/tickets")}>
              <FaTicketAlt className="mr-1" /> All Tickets
            </Link>
          </li>
          <li>
            <Link to={dashboardPath} className={isActive(dashboardPath)}>
              <FaTachometerAlt className="mr-1" /> Dashboard
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-gray-700 space-x-4">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <span className="hidden sm:inline font-bold mr-2">
                  {user.displayName || "User"}
                </span>

                <div className="w-10 rounded-full avatar">
                  <img
                    src={user.photoURL || "/avatar.png"}
                    alt="User Avatar"
                    onError={(e) => {
                      e.target.src = "/avatar.png";
                    }}
                    className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                </div>
              </div>

              <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="font-bold px-4 py-2 pointer-events-none border-b">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/profile">
                    <FaUser /> My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="text-error flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm hidden md:flex"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
