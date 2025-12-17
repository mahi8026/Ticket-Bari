import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; 
import useAuth from "./useAuth";
import useRole from "./useRole"; 
const useUserProfile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole(); 

    const {
        data: profile = {},
        isPending: isProfileLoading,
        error: profileError,
    } = useQuery({
        queryKey: ["userProfile", user?.email],
        
        enabled: !loading && !!user?.email, 

        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axiosSecure.get(`/users/profile/${user.email}`);
            
            return {
                ...res.data, 
                photoURL: res.data.photo || user.photoURL || 'https://via.placeholder.com/150',
                userRole: role, 
            };
        },
    });

    return { profile, isProfileLoading, profileError };
};

export default useUserProfile;