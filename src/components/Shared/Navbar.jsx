import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate mr-4">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <FiMoon className="swap-off w-6 h-6 text-gray-700 dark:text-gray-400" />
      <FiSun className="swap-on w-6 h-6 text-yellow-500" />
    </label>
  );
};

const Navbar = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const { role: userRole, isRoleLoading } = useRole();
  const location = useLocation();

  const dashboardPath =
    userRole === "admin"
      ? "/dashboard/admin-profile" 
      : userRole === "vendor"
      ? "/dashboard/vendor-overview" 
      : "/dashboard/profile";

  const navItems = (
    <>
      <li>
        <Link
          to="/"
          className={`font-semibold ${
            location.pathname === "/"
              ? "text-primary border-b-2 border-primary"
              : ""
          }`}
        >
          Home
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link
              to="/tickets"
              className={`font-semibold ${
                location.pathname === "/tickets"
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              All Tickets
            </Link>
          </li>
          <li>
            <Link
              to={dashboardPath}
              className={`font-semibold ${
                location.pathname.startsWith("/dashboard")
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold text-primary flex items-center gap-2"
        >
          <FaBus className="text-2xl" /> TicketBari
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{navItems}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {authLoading || isRoleLoading ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : user ? (

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="font-bold px-4 py-2 border-b border-base-300 text-primary">
                {user?.displayName || "Member"}
              </li>
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={logOut} className="text-error font-semibold">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-sm btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
