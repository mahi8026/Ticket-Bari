import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const price = parseFloat(booking.totalPrice).toFixed(2);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
          setError("Failed to initialize payment. Please try again.");
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setError("");

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentInfo = {
        userEmail: user.email,
        transactionId: paymentIntent.id,
        totalPrice: price,
        date: new Date(),
        bookingId: booking._id,
        ticketId: booking.ticketId,
        quantity: booking.quantity,
        status: "paid",
      };

      const res = await axiosSecure.patch(
        `/bookings/pay/${booking._id}`,
        paymentInfo
      );

      setProcessing(false);

      if (res.data.success) {
        Swal.fire({
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}.`,
          icon: "success",
        });

        navigate("/dashboard/my-bookings");
      } else {
        setError("Payment succeeded, but failed to update database.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-2">
          Payment Complete! Transaction ID: {transactionId}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block mt-6"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
