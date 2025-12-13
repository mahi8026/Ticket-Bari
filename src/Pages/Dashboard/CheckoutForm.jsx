import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import React from 'react';

const CheckoutForm = ({ booking, refetchBookings, closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [clientLoading, setClientLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setClientLoading(true);
        setError('');

        if (!stripe || !elements) {
            setClientLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setClientLoading(false);
            return;
        }

        // 1. Create Payment Method (Client-Side)
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            console.log('[error]', paymentMethodError);
            setError(paymentMethodError.message);
            setClientLoading(false);
            return;
        }

        // 2. Confirm Card Payment using the client secret (Client-Side)
        // The clientSecret is passed via the Elements component in MyBookings.jsx
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            booking.clientSecret, // This needs to be correctly passed down from MyBookings
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        
        if (confirmError) {
            console.log('Confirm Error:', confirmError);
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment Succeeded:', paymentIntent);
            
            // 3. Send Payment Confirmation to Server (Server-Side Finalization)
            const paymentInfo = {
                transactionId: paymentIntent.id,
                totalPrice: booking.totalPrice,
                bookingId: booking._id,
                ticketId: booking.ticketId, 
                quantity: booking.quantity,
                email: user.email,
                date: new Date(),
            };

            const res = await axiosSecure.post('/payment', paymentInfo);
            
            if (res.data.bookingUpdateResult.acknowledged) {
                Swal.fire({
                    title: "Payment Successful!",
                    html: `Your booking is confirmed.<br>Transaction ID: <span class="font-mono">${paymentIntent.id}</span>`,
                    icon: "success"
                });
                
                // Close the modal and refresh the bookings list
                closeModal();
                refetchBookings();
            } else {
                Swal.fire("Error", "Payment succeeded, but failed to update booking status. Contact support.", "error");
            }
        }
        setClientLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-base-200">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button 
                className="btn btn-primary btn-block mt-6" 
                type="submit" 
                disabled={!stripe || !elements || clientLoading}
            >
                {clientLoading ? 'Processing...' : `Pay $${booking?.totalPrice.toFixed(2)}`}
            </button>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
    );
};

export default CheckoutForm;