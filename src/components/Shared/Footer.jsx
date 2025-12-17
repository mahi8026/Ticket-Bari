import React from "react";

import { Link } from "react-router-dom";
import {
  FaBus,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";
import { SiStripe } from "react-icons/si";

const Footer = () => {
  return (
    <div className="bg-neutral text-neutral-content font-sans">
     
      <footer className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
       
        <aside className="space-y-4">
          <Link
            to="/"
            className="flex items-center text-3xl font-extrabold text-indigo-400 hover:opacity-80 transition-opacity"
          >
            <FaBus className="text-2xl mr-2" /> TicketBari
          </Link>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Your trusted partner for booking bus, train, launch, and flight
            tickets effortlessly.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title text-lg font-bold text-white uppercase tracking-wide mb-3 opacity-90">
            Quick Links
          </h6>
          <div className="flex flex-row flex-wrap gap-4 md:gap-x-6">
            <Link
              to="/"
              className="link link-hover text-gray-300 hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/tickets"
              className="link link-hover text-gray-300 hover:text-indigo-400 transition-colors"
            >
              All Tickets
            </Link>
            <Link
              to="/contact"
              className="link link-hover text-gray-300 hover:text-indigo-400 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="link link-hover text-gray-300 hover:text-indigo-400 transition-colors"
            >
              About Us
            </Link>
          </div>
        </nav>

      
        <nav>
          <h6 className="footer-title text-lg font-bold text-white uppercase tracking-wide mb-3 opacity-90">
            Contact Info
          </h6>
        
          <div className="flex flex-row flex-wrap gap-x-6 gap-y-3">
            <a
              href="mailto:support@ticketbari.com"
              className="flex items-center text-gray-300 hover:text-white transition-colors group"
            >
              <FaEnvelope className="mr-3 text-indigo-400 group-hover:text-indigo-300" />
              support@ticketbari.com
            </a>

            <a
              href="tel:+880123456789"
              className="flex items-center text-gray-300 hover:text-white transition-colors group"
            >
              <FaPhone className="mr-3 text-indigo-400 group-hover:text-indigo-300" />
              +880 123 456 789
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors group"
            >
              <FaFacebook className="mr-3 text-indigo-400 group-hover:text-indigo-300" />
              TicketBari Official
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors group"
            >
              <FaXTwitter className="mr-3 text-indigo-400 group-hover:text-indigo-300" />
              @TicketBari2025
            </a>
          </div>
        </nav>

        <nav className="flex flex-col space-y-3">
          <h6 className="footer-title text-lg font-bold text-white uppercase tracking-wide mb-2 opacity-90">
            Payment Methods
          </h6>
          <p className="text-gray-400 text-sm mb-2">
            We accept safe and secure payments:
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <SiStripe className="text-4xl text-[#635BFF]" title="Stripe" />
            </div>

            <div className="bg-white px-3 py-2 rounded-lg shadow-sm font-bold text-blue-800 text-sm">
              VISA
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm font-bold text-red-600 text-sm">
              MasterCard
            </div>
            
          </div>
        </nav>
      </footer>

      <div className="footer footer-center p-6 bg-[#1a1a1a] text-neutral-content border-t border-gray-800">
        <aside>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TicketBari. All rights reserved.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
