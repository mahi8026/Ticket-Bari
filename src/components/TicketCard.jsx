import { Link } from "react-router-dom";
import {
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaTags,
  FaDollarSign,
} from "react-icons/fa";
import React from "react";

const getTransportIcon = (type) => {
  if (!type || typeof type !== "string") {
    return <FaTags className="text-xl text-gray-500" />;
  }

  switch (type.toLowerCase()) {
    case "bus":
      return <FaBus className="text-xl text-indigo-600" />;
    case "train":
      return <FaTrain className="text-xl text-red-600" />;
    case "plane":
      return <FaPlane className="text-xl text-blue-600" />;
    case "launch":
      return <FaShip className="text-xl text-teal-600" />;
    default:
      return <FaTags className="text-xl text-gray-500" />;
  }
};

const TicketCard = ({ ticket }) => {
  const {
    _id,
    title,
    price,
    quantity,
    seatsAvailable,
    ticketType: transportType = "",
    imageUrl: image,
    from,
    to,
    departureDate,
    perks,
  } = ticket;

  const displaySeats = seatsAvailable !== undefined ? seatsAvailable : quantity;

  return (
    <div className="card w-full bg-base-100 shadow-xl image-full h-96 transition-transform hover:scale-[1.02] duration-300">
      <figure>
        <img src={image} alt={title} className="w-full object-cover" />
      </figure>
      <div className="card-body p-4  bg-opacity-40 text-white rounded-xl">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-2xl font-bold">{title}</h2>
          {getTransportIcon(transportType)}
        </div>

        <div className="flex flex-col gap-1 mt-2">
          {from && to && (
            <p className="text-sm">
              Route: {from} → {to}
            </p>
          )}
          <p className="text-lg font-semibold flex items-center">
            <FaDollarSign className="mr-1" /> Price: ${price}
          </p>
          <p className="text-sm">Available: {displaySeats} Tickets</p>
          {departureDate && (
            <p className="text-xs italic">
              Departs: {new Date(departureDate).toLocaleString()}
            </p>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-semibold">Perks:</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {perks?.map((perk, index) => (
              <span key={index} className="badge badge-info badge-outline">
                {perk}
              </span>
            ))}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/ticket/${_id}`}
            className="btn btn-primary text-black btn-sm"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
