import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const PaymentForm = ({ bookingDetails, handlePaymentSuccess }) => {
  const {
    totalPrice: price,
    _id: bookingId,
    ticketId,
    quantity,
  } = bookingDetails;

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const userEmail = user?.email;

  useEffect(() => {
    if (price > 0 && userEmail) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching payment intent:", err);
          setPaymentError("Could not initialize payment intent.");
          Swal.fire("Error", "Failed to initialize payment.", "error");
        });
    }
  }, [price, axiosSecure, userEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret || processing) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: userEmail,
          },
        },
      });

    if (confirmError) {
      setPaymentError(confirmError.message);
      setProcessing(false);
      Swal.fire("Payment Failed", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        ticketId: ticketId,
        quantity: quantity,
        price: price,
        transactionId: paymentIntent.id,
        currency: paymentIntent.currency,
      };

      try {
        const res = await axiosSecure.patch(
          `/bookings/pay/${bookingId}`,
          paymentData
        );

        if (res.data.success) {
          Swal.fire(
            "Success!",
            `Payment complete. Transaction ID: ${paymentIntent.id}.`,
            "success"
          );
          handlePaymentSuccess();
        } else {
          Swal.fire(
            "Server Error",
            "Payment succeeded, but failed to update booking status and inventory.",
            "error"
          );
        }
      } catch (err) {
        console.error("Server Finalization Error:", err);
        Swal.fire(
          "Finalization Error",
          "Could not save payment to server database. Please contact support.",
          "error"
        );
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg space-y-4">
      <h3 className="text-2xl font-bold text-center text-primary">
        Total Payable: ${price?.toFixed(2) || "0.00"}
      </h3>

      <div className="border p-3 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
              },
            },
          }}
        />
      </div>

      <p className="text-sm text-gray-500">
        Your card will be charged ${(price || 0).toFixed(2)} USD.
      </p>

      {paymentError && (
        <p className="text-red-500 text-sm text-center">{paymentError}</p>
      )}

      <button
        type="submit"
        className={`w-full btn btn-primary text-white ${
          processing || !stripe || !clientSecret ? "btn-disabled" : ""
        }`}
        disabled={processing || !stripe || !elements || !clientSecret}
      >
        {processing ? "Processing..." : `Pay $${(price || 0).toFixed(2)}`}
      </button>
      {clientSecret && !processing && (
        <p className="text-xs text-center text-green-600 mt-2">
          Payment initialized. Ready to pay.
        </p>
      )}
    </form>
  );
};

export default PaymentForm;
