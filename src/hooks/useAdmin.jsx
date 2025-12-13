import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; // 

import useAuth from "./useAuth";


const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
   
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
     
      return res.data?.role === "admin";
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
