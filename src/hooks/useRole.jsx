// --- Inside useRole.jsx ---
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; // Must import useAxiosSecure
import useAuth from "./useAuth";

const useRole = () => {
    const { user, loading } = useAuth(); // Auth loading state
    const axiosSecure = useAxiosSecure();

    const { 
        data: roleData, 
        isPending: isRoleLoading 
    } = useQuery({
        queryKey: [user?.email, "userRole"],
        
        // CRITICAL: The query runs ONLY when Auth is NOT loading AND user email exists.
        enabled: !loading && !!user?.email, 
        
        queryFn: async () => {
            console.log("Fetching role for:", user.email); // ADD THIS LOG to see it fire
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        }
    });

    const role = roleData?.role || 'user';

    return { role, isRoleLoading };
};

export default useRole;