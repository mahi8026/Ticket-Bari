import { useState } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { SiBkash, SiNagad } from "react-icons/si";
import { SiVisa, SiMastercard } from "react-icons/si";
import PaymentForm from "../PaymentForm";
import MobileBankingPayment from "./MobileBankingPayment";

const PaymentMethodSelector = ({ bookingDetails, handlePaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: "mobile_banking",
      name: "Mobile Banking",
      description: "bKash, Nagad - Most Popular in Bangladesh",
      icon: FaMobileAlt,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      borderColor: "border-primary-500",
      recommended: true,
      providers: [
        { icon: SiBkash, name: "bKash" },
        { icon: SiNagad, name: "Nagad" },
      ],
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: FaCreditCard,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50 dark:bg-secondary-900/20",
      borderColor: "border-secondary-500",
      recommended: false,
      providers: [
        { icon: SiVisa, name: "Visa" },
        { icon: SiMastercard, name: "Mastercard" },
      ],
    },
  ];

  if (selectedMethod === "mobile_banking") {
    return (
      <div>
        <button
          onClick={() => setSelectedMethod(null)}
          className="mb-6 text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
        >
          ← Back to payment methods
        </button>
        <MobileBankingPayment
          amount={bookingDetails.totalPrice}
          bookingDetails={bookingDetails}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setSelectedMethod(null)}
        />
      </div>
    );
  }

  if (selectedMethod === "card") {
    return (
      <div>
        <button
          onClick={() => setSelectedMethod(null)}
          className="mb-6 text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
        >
          ← Back to payment methods
        </button>
        <PaymentForm
          bookingDetails={bookingDetails}
          handlePaymentSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          Choose Payment Method
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Select your preferred payment method to complete booking
        </p>
      </div>

      {/* Amount Display */}
      <div className="card-premium p-6 text-center">
        <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          Total Amount to Pay
        </div>
        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          ৳{bookingDetails.totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`
                w-full p-6 rounded-xl border-2 transition-all text-left
                ${method.bgColor} ${method.borderColor}
                hover:shadow-lg relative overflow-hidden
              `}
            >
              {method.recommended && (
                <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
              )}

              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center text-white`}
                >
                  <Icon className="text-3xl" />
                </div>

                <div className="flex-1">
                  <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    {method.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {method.description}
                  </div>

                  {/* Provider Icons */}
                  <div className="flex items-center gap-3">
                    {method.providers.map((provider, index) => {
                      const ProviderIcon = provider.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
                        >
                          <ProviderIcon className="text-lg" />
                          <span>{provider.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-primary-500">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="card-premium p-4">
        <div className="flex items-start gap-3">
          <div className="text-success-500 text-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Secure Payment
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              All payments are encrypted and processed securely. We never store
              your payment information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
