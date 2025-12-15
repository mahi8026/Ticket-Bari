// src/components/BookingModal.jsx

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import React from "react";
// 🚨 Ensure PaymentForm is created and imported
import PaymentForm from "./PaymentForm";

// Props received from TicketDetails.jsx
const BookingModal = ({ ticket, isOpen, closeModal, refetchTickets }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // State to hold the confirmed booking data, including the MongoDB _id
  const [bookingResult, setBookingResult] = useState(null); // Calculate maximum available tickets

  const maxQuantity = ticket.quantity; // Ensure the ticket price is a number

  const unitPrice = parseFloat(ticket.price); // Reset modal state when closed

  const handleClose = () => {
    setBookingResult(null); // Reset booking state
    setQuantity(1); // Reset quantity
    closeModal(); // Closes the headless UI modal
  }; // Function called by PaymentForm after successful server update

  const handlePaymentSuccess = () => {
    refetchTickets(); // Update available tickets on parent page
    handleClose(); // Close the modal completely
  }; // Handle form submission and booking creation

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const totalPrice = unitPrice * quantity;

    const bookingInfo = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      transportType: ticket.transportType,
      unitPrice: unitPrice,
      quantity: quantity,
      totalPrice: totalPrice,
      departureDate: ticket.departureDate,
      userEmail: user?.email,
      userName: user?.displayName,
      bookingDate: new Date(),
      status: "pending", // Default status before payment
    };

    try {
      // POST request to your backend to save the booking
      const res = await axiosSecure.post("/bookings", bookingInfo);

      if (res.data.insertedId) {
        // 🛑 CORE CHANGE: Save the booking data and ID, but DO NOT call closeModal() here
        const fullBookingData = {
          ...bookingInfo, // Includes all initial data
          _id: res.data.insertedId, // The ID of the newly created booking (needed for /bookings/pay/:id)
        };
        setBookingResult(fullBookingData); // Triggers conditional rendering to show PaymentForm

        Swal.fire({
          title: "Booking Saved!",
          text: `Proceed to payment below to secure your tickets. Total: $${totalPrice.toFixed(
            2
          )}.`,
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
        }); // refetchTickets(); // OPTIONAL: Could refetch here, but usually waits until payment // closeModal(); // 🛑 REMOVED THIS LINE TO ALLOW PAYMENT FORM TO DISPLAY
      } else if (res.data.message) {
        // Handle server-side errors like quantity exceeded
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Failed to submit booking. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  {bookingResult
                    ? `Finalize Payment for: ${ticket.title}`
                    : `Book Ticket: ${ticket.title}`}
                </Dialog.Title>

                {bookingResult ? (
                  // --- STEP 2: SHOW PAYMENT FORM ---
                  <PaymentForm
                    bookingDetails={bookingResult}
                    handlePaymentSuccess={handlePaymentSuccess}
                  />
                ) : (
                  // --- STEP 1: SHOW INITIAL BOOKING FORM ---
                  <form onSubmit={handleBooking} className="mt-4 space-y-4">
                    <p>Ticket Price (per unit): **${unitPrice.toFixed(2)}**</p>
                    <p className="text-sm text-gray-500">
                      Available: **{maxQuantity}** seats left
                    </p>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>

                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.min(parseInt(e.target.value) || 1, maxQuantity)
                          )
                        }
                        min="1"
                        max={maxQuantity}
                        required
                        className="mt-1 input input-bordered w-full"
                      />
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-lg font-bold">
                        <span className="text-primary">
                          ${(unitPrice * quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          loading || quantity < 1 || quantity > maxQuantity
                        }
                      >
                        {loading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Proceed to Payment" // Text changed for clarity
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
