import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaMobileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { SiBkash, SiNagad } from "react-icons/si";

const MobileBankingPayment = ({
  amount,
  bookingDetails,
  onSuccess,
  onCancel,
}) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const providers = [
    {
      id: "bkash",
      name: "bKash",
      icon: SiBkash,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      borderColor: "border-pink-500",
      textColor: "text-pink-600 dark:text-pink-400",
      description: "Pay with bKash - Most Popular",
      fee: 1.5, // 1.5% transaction fee
    },
    {
      id: "nagad",
      name: "Nagad",
      icon: SiNagad,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-500",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Pay with Nagad - Fast & Secure",
      fee: 1.0, // 1.0% transaction fee
    },
  ];

  const selectedProviderData = providers.find((p) => p.id === selectedProvider);
  const transactionFee = selectedProviderData
    ? (amount * selectedProviderData.fee) / 100
    : 0;
  const totalAmount = amount + transactionFee;

  const validatePhoneNumber = (number) => {
    // Bangladesh phone number validation (11 digits starting with 01)
    const phoneRegex = /^01[3-9]\d{8}$/;
    return phoneRegex.test(number);
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
    setPaymentStatus(null);
    setOtpRequired(false);
    setOtp("");
  };

  const initiatePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid Bangladesh phone number (01XXXXXXXXX)");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      // Call backend API to initiate payment
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "https://ticket-bari-server-pi.vercel.app"}/mobile-banking/initiate`,
        {
          provider: selectedProvider,
          phoneNumber,
          amount: totalAmount,
          bookingId: bookingDetails._id,
          bookingDetails,
        },
      );

      if (response.data.success) {
        setTransactionId(response.data.transactionId);

        // Check if OTP is required
        if (response.data.otpRequired) {
          setOtpRequired(true);
          setPaymentStatus("otp_required");
          toast.info("Please check your phone for OTP");
        } else {
          // Payment initiated, waiting for user confirmation on phone
          setPaymentStatus("awaiting_confirmation");
          toast.info("Please check your phone and confirm the payment");

          // Start polling for payment status
          pollPaymentStatus(response.data.transactionId);
        }
      } else {
        throw new Error(response.data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setPaymentStatus("failed");
      toast.error(
        error.response?.data?.message ||
          "Failed to initiate payment. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "https://ticket-bari-server-pi.vercel.app"}/mobile-banking/verify-otp`,
        {
          transactionId,
          otp,
        },
      );

      if (response.data.success) {
        setPaymentStatus("awaiting_confirmation");
        toast.success("OTP verified! Please confirm payment on your phone");
        pollPaymentStatus(transactionId);
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const pollPaymentStatus = async (txnId) => {
    let attempts = 0;
    const maxAttempts = 60; // Poll for 5 minutes (60 * 5 seconds)

    const poll = setInterval(async () => {
      attempts++;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "https://ticket-bari-server-pi.vercel.app"}/mobile-banking/status/${txnId}`,
        );

        if (response.data.status === "completed") {
          clearInterval(poll);
          setPaymentStatus("success");
          toast.success("Payment successful!");
          setTimeout(() => {
            onSuccess(response.data);
          }, 2000);
        } else if (response.data.status === "failed") {
          clearInterval(poll);
          setPaymentStatus("failed");
          toast.error("Payment failed. Please try again.");
        } else if (attempts >= maxAttempts) {
          clearInterval(poll);
          setPaymentStatus("timeout");
          toast.warning(
            "Payment confirmation timeout. Please check your transaction history.",
          );
        }
      } catch (error) {
        console.error("Status polling error:", error);
        if (attempts >= maxAttempts) {
          clearInterval(poll);
          setPaymentStatus("timeout");
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  const handleCancel = () => {
    if (
      paymentStatus === "processing" ||
      paymentStatus === "awaiting_confirmation"
    ) {
      toast.warning(
        "Please complete or cancel the payment on your phone first",
      );
      return;
    }
    onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaMobileAlt className="text-3xl text-primary-500" />
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Mobile Banking Payment
          </h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Pay securely with bKash or Nagad
        </p>
      </div>

      {/* Amount Display */}
      <div className="card-premium p-6 text-center">
        <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          Total Amount
        </div>
        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          ৳{amount.toFixed(2)}
        </div>
        {transactionFee > 0 && (
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            + ৳{transactionFee.toFixed(2)} transaction fee
          </div>
        )}
      </div>

      {/* Provider Selection */}
      {!selectedProvider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Select Payment Method
          </h3>
          {providers.map((provider) => {
            const Icon = provider.icon;
            return (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProviderSelect(provider.id)}
                className={`
                  w-full p-6 rounded-xl border-2 transition-all
                  ${provider.bgColor} ${provider.borderColor}
                  hover:shadow-lg
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center ${provider.textColor}`}
                  >
                    <Icon className="text-3xl" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                      {provider.name}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {provider.description}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Transaction fee: {provider.fee}%
                    </div>
                  </div>
                  <div className="text-primary-500">
                    <FaCheckCircle className="text-2xl" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Payment Form */}
      {selectedProvider && !paymentStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Selected Provider */}
          <div
            className={`p-4 rounded-xl ${selectedProviderData.bgColor} border-2 ${selectedProviderData.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <selectedProviderData.icon
                  className={`text-2xl ${selectedProviderData.textColor}`}
                />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedProviderData.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                Change
              </button>
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="form-label-custom">
              {selectedProviderData.name} Account Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="01XXXXXXXXX"
                maxLength={11}
                className="form-input-custom pl-12"
                disabled={isProcessing}
              />
              <FaMobileAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Enter your 11-digit {selectedProviderData.name} account number
            </p>
          </div>

          {/* Amount Breakdown */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">
                Booking Amount
              </span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                ৳{amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">
                Transaction Fee ({selectedProviderData.fee}%)
              </span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                ৳{transactionFee.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 flex justify-between">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">
                Total
              </span>
              <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                ৳{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <FaShieldAlt className="text-primary-500 text-xl mt-1" />
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              <div className="font-semibold mb-1">Secure Payment</div>
              <div>
                Your payment is processed securely through{" "}
                {selectedProviderData.name}'s official gateway. We never store
                your PIN or OTP.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={initiatePayment}
              disabled={!validatePhoneNumber(phoneNumber) || isProcessing}
              className="flex-1 btn-primary-custom disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaLock />
                  Pay ৳{totalAmount.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* OTP Verification */}
      <AnimatePresence>
        {otpRequired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card-premium p-6 space-y-4"
          >
            <div className="text-center">
              <FaMobileAlt className="text-4xl text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                Enter OTP
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Please enter the 4-digit OTP sent to {phoneNumber}
              </p>
            </div>

            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                className="form-input-custom text-center text-2xl tracking-widest"
                disabled={isProcessing}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOtpRequired(false);
                  setPaymentStatus(null);
                }}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={verifyOTP}
                disabled={otp.length !== 4 || isProcessing}
                className="flex-1 btn-primary-custom disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Status */}
      <AnimatePresence>
        {paymentStatus && paymentStatus !== "otp_required" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card-premium p-8 text-center"
          >
            {paymentStatus === "processing" && (
              <>
                <FaSpinner className="text-6xl text-primary-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Initiating Payment...
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Please wait while we process your request
                </p>
              </>
            )}

            {paymentStatus === "awaiting_confirmation" && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaMobileAlt className="text-6xl text-primary-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Confirm Payment on Your Phone
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Please check your {selectedProviderData?.name} app and confirm
                  the payment
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full text-sm text-primary-600 dark:text-primary-400">
                  <FaSpinner className="animate-spin" />
                  Waiting for confirmation...
                </div>
              </>
            )}

            {paymentStatus === "success" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaCheckCircle className="text-6xl text-success-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-success-600 dark:text-success-400 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Your booking has been confirmed
                </p>
                {transactionId && (
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Transaction ID: {transactionId}
                  </div>
                )}
              </>
            )}

            {paymentStatus === "failed" && (
              <>
                <FaTimesCircle className="text-6xl text-error-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-error-600 dark:text-error-400 mb-2">
                  Payment Failed
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Your payment could not be processed. Please try again.
                </p>
                <button
                  onClick={() => {
                    setPaymentStatus(null);
                    setSelectedProvider(null);
                    setPhoneNumber("");
                  }}
                  className="btn-primary-custom"
                >
                  Try Again
                </button>
              </>
            )}

            {paymentStatus === "timeout" && (
              <>
                <FaTimesCircle className="text-6xl text-warning-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-warning-600 dark:text-warning-400 mb-2">
                  Payment Timeout
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We couldn't confirm your payment. Please check your
                  transaction history.
                </p>
                <button onClick={handleCancel} className="btn-outline-custom">
                  Close
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileBankingPayment;
