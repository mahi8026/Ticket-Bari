import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole'; 

const VendorProfile = () => {
    const { user } = useAuth();
    
    const { role } = useRole(); 

    const name = user?.displayName || 'N/A';
    const email = user?.email || 'N/A';
    const photoURL = user?.photoURL;
    

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Vendor Profile</h2>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Picture */}
                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                        <img 
                            src={photoURL || "https://via.placeholder.com/150"} 
                            alt={`${name}'s Profile`} 
                        />
                    </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-3 w-full">
                    <div className="grid grid-cols-2 gap-4 border-b pb-2">
                        <p className="font-semibold text-gray-600">Name:</p>
                        <p className="font-bold text-lg">{name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b pb-2">
                        <p className="font-semibold text-gray-600">Email:</p>
                        <p className="text-lg">{email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b pb-2">
                        <p className="font-semibold text-gray-600">Current Role:</p>
                        <span className="badge badge-lg badge-secondary text-white capitalize">
                            {role}
                        </span>
                    </div>

                    
                </div>
            </div>
            
            <div className="mt-8 text-right">
                <button className="btn btn-outline btn-secondary">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default VendorProfile;