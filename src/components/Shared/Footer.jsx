import React from "react";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaMobile,
} from "react-icons/fa";
import { SiStripe, SiPaypal, SiVisa, SiMastercard } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-white hover:text-primary transition-colors"
            >
              <FaBus className="text-primary mr-2" />
              TicketBari
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Bangladesh's leading digital ticketing platform for bus, train,
              launch, and flight bookings. Travel smart, travel with TicketBari.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/ticketbari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com/ticketbari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com/ticketbari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://linkedin.com/company/ticketbari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tickets"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Services & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/bus"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Bus Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/services/train"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Train Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/services/launch"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Launch Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/services/flight"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Flight Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact & Support
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">
                    House 123, Road 456
                    <br />
                    Dhanmondi, Dhaka 1205
                    <br />
                    Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary flex-shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  +880 123 456 7890
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a
                  href="mailto:support@ticketbari.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  support@ticketbari.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaClock className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  24/7 Customer Support
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Secure Payments
              </h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white p-2 rounded shadow-sm">
                  <SiStripe
                    className="text-2xl text-[#635BFF]"
                    title="Stripe"
                  />
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <SiPaypal
                    className="text-2xl text-[#0070BA]"
                    title="PayPal"
                  />
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <SiVisa className="text-2xl text-[#1A1F71]" title="Visa" />
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <SiMastercard
                    className="text-2xl text-[#EB001B]"
                    title="Mastercard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <FaShieldAlt className="text-3xl text-primary" />
              <h4 className="font-semibold text-white">Secure Booking</h4>
              <p className="text-sm text-gray-400">
                SSL encrypted transactions
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <FaHeadset className="text-3xl text-primary" />
              <h4 className="font-semibold text-white">24/7 Support</h4>
              <p className="text-sm text-gray-400">
                Round-the-clock assistance
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <FaMobile className="text-3xl text-primary" />
              <h4 className="font-semibold text-white">Mobile Friendly</h4>
              <p className="text-sm text-gray-400">Book anywhere, anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container-custom px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} TicketBari. All rights reserved. | Made with ❤️ in
              Bangladesh
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
