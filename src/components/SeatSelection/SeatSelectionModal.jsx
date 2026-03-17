import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import SeatMap from "./SeatMap";

const SeatSelectionModal = ({
  isOpen,
  onClose,
  ticket,
  onConfirm,
  maxSeats = 5,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleConfirm = async () => {
    if (selectedSeats.length === 0) return;

    setIsProcessing(true);
    try {
      await onConfirm(selectedSeats);
      onClose();
    } catch (error) {
      console.error("Error confirming seats:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalSeatCharges = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0,
  );
  const basePrice = ticket?.price || 0;
  const totalPrice = basePrice + totalSeatCharges;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      Select Your Seats
                    </h2>
                    <p className="text-primary-100">
                      {ticket?.title || "Ticket"} - {ticket?.ticketType}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <SeatMap
                    ticketType={ticket?.ticketType}
                    totalSeats={ticket?.seatsAvailable || 40}
                    bookedSeats={ticket?.bookedSeats || []}
                    onSeatSelect={handleSeatSelect}
                    maxSeats={maxSeats}
                    seatPricing={{
                      standard: { price: 0, label: "Standard" },
                      window: { price: 50, label: "Window Seat" },
                      aisle: { price: 30, label: "Aisle Seat" },
                      premium: { price: 100, label: "Premium Seat" },
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        Total Amount
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <span>Base Price:</span>
                          <span className="font-semibold">৳{basePrice}</span>
                        </div>
                        {totalSeatCharges > 0 && (
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <span>Seat Charges:</span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">
                              +৳{totalSeatCharges}
                            </span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          ৳{totalPrice}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      <button
                        onClick={onClose}
                        className="flex-1 md:flex-none px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={selectedSeats.length === 0 || isProcessing}
                        className={`
                          flex-1 md:flex-none px-8 py-3 rounded-xl font-semibold
                          inline-flex items-center justify-center gap-2
                          transition-all duration-300
                          ${
                            selectedSeats.length === 0 || isProcessing
                              ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                          }
                        `}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to Booking
                            <FaArrowRight />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {selectedSeats.length === 0 && (
                    <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                      Please select at least one seat to continue
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SeatSelectionModal;
