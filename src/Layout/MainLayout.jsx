import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBus, FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import Footer from "../components/Shared/Footer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const navItems = (
    <>
      <li>
        <Link className="font-semibold" to="/">Home</Link>
      </li>
      {user && (
        <li>
          <Link className="font-semibold" to="/tickets">All Tickets</Link>
        </li>
      )}
      {user && (
        <li>
          <Link className="font-semibold" to="/dashboard">Dashboard</Link>
        </li>
      )}
    </>
  );

  

  return (
    <div className="navbar bg-base-100 sticky top-0 z-40 shadow-md">
      <div className="navbar-start">
        {/* Mobile Hamburger Menu */}
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
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          <FaBus className="text-lg" /> TicketBari
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="font-semibold px-4 py-2">{user.displayName}</li>
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary ml-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};



const MainLayout = () => {
    const { loading: authLoading } = useAuth();
    const { isRoleLoading } = useRole(); 

    console.log("Auth Loading:", authLoading, "Role Loading:", isRoleLoading);

    if (authLoading || isRoleLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow pt-4 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;

