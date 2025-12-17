import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const location = useLocation();
  const bookingToPay = location.state?.booking;

  if (!bookingToPay) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-error">
          No Booking Data Found.
        </h2>
        <p>Please navigate from the correct booking summary page.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Finalize Payment</h2>
      <div className="mb-6 p-4 border rounded-lg bg-base-200">
        <p className="text-lg">Ticket: **{bookingToPay.title}**</p>
        <p>Quantity: **{bookingToPay.quantity}**</p>
        <p className="text-2xl font-extrabold text-primary mt-2">
          Total: ${parseFloat(bookingToPay.totalPrice).toFixed(2)}
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm booking={bookingToPay} />
      </Elements>
    </div>
  );
};

export default Payment;
