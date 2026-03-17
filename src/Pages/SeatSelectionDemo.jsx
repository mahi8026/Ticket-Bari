import { useState } from "react";
import { motion } from "framer-motion";
import SeatMap from "../components/SeatSelection/SeatMap";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const SeatSelectionDemo = () => {
  const [selectedTransport, setSelectedTransport] = useState("Bus");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const transportTypes = [
    {
      name: "Bus",
      icon: FaBus,
      color: "from-primary-500 to-primary-600",
      seats: 40,
    },
    {
      name: "Train",
      icon: FaTrain,
      color: "from-success-500 to-success-600",
      seats: 48,
    },
    {
      name: "Launch",
      icon: FaShip,
      color: "from-secondary-500 to-secondary-600",
      seats: 48,
    },
    {
      name: "Flight",
      icon: FaPlane,
      color: "from-accent-500 to-accent-600",
      seats: 90,
    },
  ];

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const totalSeatCharges = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0,
  );
  const basePrice = 500; // Demo base price
  const totalPrice = basePrice * selectedSeats.length + totalSeatCharges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 mb-4">Seat Selection Demo</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Experience our premium seat selection feature. Choose your transport
            type and select your preferred seats.
          </p>
        </motion.div>

        {/* Transport Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
            Select Transport Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transportTypes.map((transport) => {
              const Icon = transport.icon;
              return (
                <motion.button
                  key={transport.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedTransport(transport.name);
                    setSelectedSeats([]);
                  }}
                  className={`
                    p-6 rounded-xl font-semibold text-white
                    transition-all duration-300
                    ${
                      selectedTransport === transport.name
                        ? `bg-gradient-to-br ${transport.color} shadow-lg scale-105`
                        : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                    }
                  `}
                >
                  <Icon className="text-3xl mx-auto mb-2" />
                  <div className="text-lg">{transport.name}</div>
                  <div className="text-sm opacity-90">
                    {transport.seats} seats
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Seat Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SeatMap
            ticketType={selectedTransport}
            totalSeats={
              transportTypes.find((t) => t.name === selectedTransport)?.seats ||
              40
            }
            bookedSeats={[1, 5, 12, 23, 34]} // Demo booked seats
            onSeatSelect={handleSeatSelect}
            maxSeats={5}
            seatPricing={{
              standard: { price: 0, label: "Standard" },
              window: { price: 50, label: "Window Seat" },
              aisle: { price: 30, label: "Aisle Seat" },
              premium: { price: 100, label: "Premium Seat" },
            }}
          />
        </motion.div>

        {/* Summary Card */}
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-8 mt-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
              Booking Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Selected Seats ({selectedSeats.length})
                </h3>
                <div className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <div
                      key={seat.number}
                      className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                    >
                      <span className="font-medium">
                        Seat {seat.number} - {seat.label}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {seat.price > 0 ? `+৳${seat.price}` : "Base"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Price Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <span>Base Price</span>
                    <span className="font-semibold">
                      ৳{basePrice} × {selectedSeats.length}
                    </span>
                  </div>

                  {totalSeatCharges > 0 && (
                    <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <span>Seat Charges</span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        +৳{totalSeatCharges}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold">৳{totalPrice}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 btn-primary-custom"
                >
                  Proceed to Booking
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200 text-center">
            Feature Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Interactive Selection
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Click seats to select, hover for details, visual feedback on
                every action
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Premium Pricing
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Different prices for window, aisle, and premium seats
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Mobile Optimized
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Touch-friendly interface, responsive design, works on all
                devices
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelectionDemo;
