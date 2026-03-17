import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCouch,
  FaCheck,
  FaTimes,
  FaUser,
  FaWheelchair,
  FaStar,
} from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdEventSeat } from "react-icons/md";

const SeatMap = ({
  ticketType = "Bus",
  totalSeats = 40,
  bookedSeats = [],
  onSeatSelect,
  maxSeats = 5,
  seatPricing = {},
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Default seat pricing based on type
  const defaultPricing = {
    standard: { price: 0, label: "Standard" },
    window: { price: 50, label: "Window" },
    aisle: { price: 30, label: "Aisle" },
    premium: { price: 100, label: "Premium" },
    accessible: { price: 0, label: "Accessible" },
  };

  const pricing = { ...defaultPricing, ...seatPricing };

  // Generate seat layout based on transport type
  const generateSeatLayout = () => {
    const layouts = {
      Bus: {
        rows: 10,
        seatsPerRow: 4,
        aisleAfter: 2,
        layout: (row, col) => {
          if (row === 0) return col < 2 ? "premium" : "standard";
          if (col === 0 || col === 3) return "window";
          return col === 1 ? "aisle" : "standard";
        },
      },
      Train: {
        rows: 12,
        seatsPerRow: 4,
        aisleAfter: 2,
        layout: (row, col) => {
          if (row < 2) return "premium";
          if (col === 0 || col === 3) return "window";
          return "standard";
        },
      },
      Launch: {
        rows: 8,
        seatsPerRow: 6,
        aisleAfter: 3,
        layout: (row, col) => {
          if (row < 2) return "premium";
          if (col === 0 || col === 5) return "window";
          return "standard";
        },
      },
      Flight: {
        rows: 15,
        seatsPerRow: 6,
        aisleAfter: 3,
        layout: (row, col) => {
          if (row < 3) return "premium";
          if (col === 0 || col === 5) return "window";
          if (col === 2 || col === 3) return "aisle";
          return "standard";
        },
      },
    };

    const config = layouts[ticketType] || layouts.Bus;
    const seats = [];
    let seatNumber = 1;

    for (let row = 0; row < config.rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < config.seatsPerRow; col++) {
        if (col === config.aisleAfter) {
          rowSeats.push({ type: "aisle", id: `aisle-${row}-${col}` });
        }

        if (seatNumber <= totalSeats) {
          const seatType = config.layout(row, col);
          rowSeats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber,
            type: seatType,
            row: row + 1,
            column: String.fromCharCode(65 + col),
            isBooked: bookedSeats.includes(seatNumber),
            price: pricing[seatType]?.price || 0,
            label: pricing[seatType]?.label || "Standard",
          });
          seatNumber++;
        }
      }
      seats.push(rowSeats);
    }

    return seats;
  };

  const seatLayout = generateSeatLayout();

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    const isSelected = selectedSeats.find((s) => s.number === seat.number);

    if (isSelected) {
      const newSelection = selectedSeats.filter(
        (s) => s.number !== seat.number,
      );
      setSelectedSeats(newSelection);
      onSeatSelect?.(newSelection);
    } else {
      if (selectedSeats.length >= maxSeats) {
        return;
      }
      const newSelection = [...selectedSeats, seat];
      setSelectedSeats(newSelection);
      onSeatSelect?.(newSelection);
    }
  };

  const getSeatIcon = (seatType) => {
    switch (seatType) {
      case "premium":
        return FaStar;
      case "accessible":
        return FaWheelchair;
      default:
        return MdEventSeat;
    }
  };

  const getSeatColor = (seat) => {
    const isSelected = selectedSeats.find((s) => s.number === seat.number);

    if (seat.isBooked) {
      return "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed";
    }
    if (isSelected) {
      return "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg scale-110";
    }

    switch (seat.type) {
      case "premium":
        return "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 hover:from-yellow-200 hover:to-yellow-300 dark:hover:from-yellow-800/40 dark:hover:to-yellow-700/40 border-2 border-yellow-400 dark:border-yellow-600";
      case "window":
        return "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 border-2 border-blue-400 dark:border-blue-600";
      case "aisle":
        return "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 hover:from-green-200 hover:to-green-300 dark:hover:from-green-800/40 dark:hover:to-green-700/40 border-2 border-green-400 dark:border-green-600";
      default:
        return "bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 hover:from-neutral-200 hover:to-neutral-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600 border-2 border-neutral-300 dark:border-neutral-600";
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="card-premium p-4">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
          Seat Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 border-2 border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
              <MdEventSeat className="text-sm" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Available
              </div>
              <div className="text-xs text-neutral-500">Base price</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-400 dark:border-blue-600 flex items-center justify-center">
              <MdEventSeat className="text-sm" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Window
              </div>
              <div className="text-xs text-neutral-500">
                +৳{pricing.window.price}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border-2 border-yellow-400 dark:border-yellow-600 flex items-center justify-center">
              <FaStar className="text-sm" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Premium
              </div>
              <div className="text-xs text-neutral-500">
                +৳{pricing.premium.price}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-lg">
              <FaCheck className="text-sm" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Selected
              </div>
              <div className="text-xs text-neutral-500">Your choice</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
              <FaTimes className="text-sm text-neutral-500" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Booked
              </div>
              <div className="text-xs text-neutral-500">Unavailable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Select Your Seats
          </h3>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {selectedSeats.length} / {maxSeats} seats selected
          </div>
        </div>

        {/* Driver/Front indicator */}
        <div className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center">
          <div className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <FaUser className="text-lg" />
            <span className="font-medium">Driver / Front</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((seat, colIndex) => {
                if (seat.type === "aisle") {
                  return (
                    <div
                      key={seat.id}
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                    >
                      <div className="w-1 h-full bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                    </div>
                  );
                }

                const SeatIcon = getSeatIcon(seat.type);
                const isSelected = selectedSeats.find(
                  (s) => s.number === seat.number,
                );
                const isHovered = hoveredSeat === seat.number;

                return (
                  <motion.button
                    key={seat.id}
                    whileHover={{ scale: seat.isBooked ? 1 : 1.1 }}
                    whileTap={{ scale: seat.isBooked ? 1 : 0.95 }}
                    onClick={() => handleSeatClick(seat)}
                    onMouseEnter={() => setHoveredSeat(seat.number)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    disabled={seat.isBooked}
                    className={`
                      relative w-10 h-10 md:w-12 md:h-12 rounded-lg
                      flex items-center justify-center
                      transition-all duration-200
                      ${getSeatColor(seat)}
                      ${seat.isBooked ? "" : "cursor-pointer hover:shadow-lg"}
                    `}
                  >
                    <SeatIcon className="text-sm md:text-base" />

                    {/* Seat number tooltip */}
                    <AnimatePresence>
                      {isHovered && !seat.isBooked && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
                        >
                          <div className="bg-neutral-900 dark:bg-neutral-800 text-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap">
                            <div className="font-semibold">
                              Seat {seat.number}
                            </div>
                            <div className="text-neutral-300">{seat.label}</div>
                            {seat.price > 0 && (
                              <div className="text-primary-400">
                                +৳{seat.price}
                              </div>
                            )}
                          </div>
                          <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-800 transform rotate-45 mx-auto -mt-1"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected checkmark */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-success-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <FaCheck className="text-white text-xs" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Selected Seats Summary
            </h3>
            <div className="space-y-3">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.number}
                  className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center font-semibold">
                      {seat.number}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800 dark:text-neutral-200">
                        Seat {seat.number} - {seat.label}
                      </div>
                      <div className="text-sm text-neutral-500">
                        Row {seat.row}, Column {seat.column}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary-600 dark:text-primary-400">
                      {seat.price > 0 ? `+৳${seat.price}` : "Base"}
                    </div>
                    <button
                      onClick={() => handleSeatClick(seat)}
                      className="text-xs text-error-500 hover:text-error-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {totalPrice > 0 && (
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Additional Seat Charges:
                    </span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ৳{totalPrice}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatMap;
