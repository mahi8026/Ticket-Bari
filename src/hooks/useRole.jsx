import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading: isAuthLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isPending: isQueryPending, 
    isError,
    isFetched,
  } = useQuery({
    queryKey: [user?.email, "userRole"],
    enabled: !isAuthLoading && !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
  }); 

  let role;
  if (roleData?.role) {
    role = roleData.role;
  } else if (isAuthLoading) {
    role = "guest"; 
  } else if (isError) {
    role = "user";
  } else {
    role = user ? "user" : "guest"; 
  } 

  const isLoading = isAuthLoading || isQueryPending; 
  if (!isAuthLoading && !!user?.email && !isFetched) {
    const isStillCheckingRole = true;
    return { role: "guest", isLoading: isStillCheckingRole };
  }

  return { role, isLoading };
};

export default useRole;
