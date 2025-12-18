import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaBus, FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import Footer from "../components/Shared/Footer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Shared/Navbar";






const MainLayout = () => {
    const { loading: authLoading } = useAuth();
    const { isRoleLoading } = useRole(); 


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

