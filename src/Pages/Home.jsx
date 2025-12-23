import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FcCustomerSupport, FcFlashOn } from "react-icons/fc";
import { MdOutlineSecurity } from "react-icons/md";

const TicketCardMini = ({ ticket }) => (
  <div className="card bg-base-100 shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
    <figure className="h-48 overflow-hidden">
      <img
        src={
          ticket.imageUrl ||
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
        }
        alt={ticket.title}
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body p-5">
      <h2 className="card-title text-lg">
        {ticket.title}
        <div className="badge badge-secondary badge-outline text-xs">
          {ticket.ticketType}
        </div>
      </h2>
      <p className="text-sm text-gray-500">
        Route: {ticket.from} ➝ {ticket.to}
      </p>
      <div className="card-actions justify-between items-center mt-3">
        <div className="text-xl font-bold text-primary">${ticket.price}</div>
        <Link
          to={`/ticket/${ticket._id}`}
          className="btn btn-sm btn-primary btn-outline"
        >
          Details
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { data: advertisedTickets = [] } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axios.get(
        "https://ticket-bari-server-pi.vercel.app//tickets/advertised"
      );
      return res.data;
    },
  });

  const { data: latestTickets = [] } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get(
        "https://ticket-bari-server-pi.vercel.app//tickets/latest"
      );
      return res.data;
    },
  });

  return (
    <div>
      <div
        className="hero rounded-xl min-h-[500px]"
        style={{
          backgroundImage: `url("https://i.ibb.co.com/8DrGKxBN/hero-illustration-16-07-2025.png")`,
          backgroundSize: "cover",

          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay bg-opacity-60  rounded-xl "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white leading-tight">
              Travel Made <span className="text-primary">Simple</span>
            </h1>
            <p className="mb-5 text-gray-200">
              Book Bus, Train, Launch, and Flight tickets seamlessly. Your next
              adventure starts here.
            </p>
            <Link
              to="/tickets"
              className="btn btn-primary text-black border-none px-8"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-20">
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl text-green-700 font-bold mb-2">
              {" "}
              Featured Deals
            </h2>
            <p className="text-gray-500">
              Hand-picked best prices just for you
            </p>
          </div>
          {advertisedTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisedTickets.map((ticket) => (
                <TicketCardMini key={ticket._id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="alert alert-info bg-blue-50 border-blue-200 text-blue-800">
              <span>
                No featured tickets available at the moment. Check back soon!
              </span>
            </div>
          )}
        </section>

        {/* LATEST TICKETS */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <div>
              <h2 className="text-3xl text-green-700  font-bold">
                Latest Arrivals
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Recently added routes and schedules
              </p>
            </div>
            <Link
              to="/tickets"
              className="btn btn-link text-primary no-underline hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          {latestTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestTickets.map((ticket) => (
                <TicketCardMini key={ticket._id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No recent tickets found.
            </div>
          )}
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-base-200 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-green-700  text-center mb-12">
            Why Choose TicketBari?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl ml-32 mb-4">
                {" "}
                <MdOutlineSecurity />{" "}
              </div>
              <h3 className="font-bold text-xl mb-2">Secure Booking</h3>
              <p className="text-gray-500">
                We prioritize your data privacy and transaction security with
                top-tier encryption.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl ml-32 mb-4">
                {" "}
                <FcFlashOn />{" "}
              </div>
              <h3 className="font-bold text-xl mb-2">Fast & Easy</h3>
              <p className="text-gray-500">
                Book your tickets in just a few clicks. No waiting in lines, no
                hassle.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl ml-32 mb-4">
                <FcCustomerSupport />
              </div>
              <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-500">
                Our dedicated support team is here to assist you anytime,
                anywhere.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
