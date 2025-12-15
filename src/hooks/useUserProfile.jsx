// src/hooks/useUserProfile.js 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; 
import useAuth from "./useAuth";
import useRole from "./useRole"; // We use this to get the role label

const useUserProfile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole(); // Get role from the separate hook for display

    const {
        data: profile = {},
        isPending: isProfileLoading,
        error: profileError,
    } = useQuery({
        // Query key includes email to re-fetch if user changes
        queryKey: ["userProfile", user?.email],
        
        // Only run the query if user is logged in and not currently loading
        enabled: !loading && !!user?.email, 

        queryFn: async () => {
            if (!user?.email) return {}; // Safety check
            
            // Backend endpoint to fetch profile data
            const res = await axiosSecure.get(`/users/profile/${user.email}`);
            
            return {
                ...res.data, // Contains name, email, photo, role, status
                // We enrich the data here for display
                photoURL: res.data.photo || user.photoURL || 'https://via.placeholder.com/150',
                userRole: role, // Use the role from useRole hook if available
            };
        },
    });

    return { profile, isProfileLoading, profileError };
};

export default useUserProfile;