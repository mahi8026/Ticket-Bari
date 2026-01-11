import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import React from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const VendorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading: isRoleLoading } = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <LoadingSpinner type="page" message="Verifying vendor access..." />;
  }

  if (user && role === "vendor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default VendorRoute;
