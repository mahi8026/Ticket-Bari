import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import {
  FaGoogle,
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";
import LoadingSpinner, {
  LoadingButton,
} from "../components/Shared/LoadingSpinner";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Very Weak", color: "bg-red-500" },
      { strength: 2, label: "Weak", color: "bg-orange-500" },
      { strength: 3, label: "Fair", color: "bg-yellow-500" },
      { strength: 4, label: "Good", color: "bg-blue-500" },
      { strength: 5, label: "Strong", color: "bg-green-500" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await createUser(data.email, data.password);

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photoURL || "",
      });

      toast.success("🎉 Registration successful! Welcome to TicketBari!");
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error.code);

      let message = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login instead.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
      toast.success("🎉 Google sign-in successful! Welcome to TicketBari!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left Side - Welcome Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left hidden lg:block"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
            Join TicketBari Today
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
            Create your account and start booking tickets for buses, trains,
            launches, and flights across Bangladesh.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✅
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                  Instant Booking
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Book tickets instantly with confirmation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  🌟
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                  Best Prices
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Compare prices and get the best deals
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔒
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                  Secure & Safe
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Your data is protected with us
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5">
            {/* Header */}
            <div className="text-center mb-5">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUserPlus className="text-white text-sm" />
                </motion.div>
              </div>
              <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                Create Account
              </h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Join thousands of travelers using TicketBari
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaUser className="inline mr-1 text-xs" />
                  Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 block"
                  >
                    <FaTimes className="inline mr-1" />
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaEnvelope className="inline mr-1 text-xs" />
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 block"
                  >
                    <FaTimes className="inline mr-1" />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaImage className="inline mr-1 text-xs" />
                  Profile Photo URL (Optional)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter photo URL (optional)"
                  type="url"
                  {...register("photoURL")}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaLock className="inline mr-1 text-xs" />
                  Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </motion.button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: `${(passwordStrength.strength / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        {passwordStrength.label}
                      </span>
                    </div>
                  </motion.div>
                )}

                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 block"
                  >
                    <FaTimes className="inline mr-1" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  <FaUserPlus className="mr-2" />
                  Create Account
                </LoadingButton>
              </div>

              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-gray-800 text-neutral-500 dark:text-neutral-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <div>
                <LoadingButton
                  loading={isLoading}
                  type="button"
                  onClick={handleGoogle}
                  className="w-full flex items-center justify-center px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-soft bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
                >
                  <FaGoogle className="text-red-500 mr-2" />
                  Sign up with Google
                </LoadingButton>
              </div>

              {/* Demo Registration Section */}
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400">
                      Quick Demo Registration
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                    Skip registration and try the demo accounts
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium text-xs shadow-sm"
                  >
                    <span className="mr-1">🚀</span>
                    Try Demo Accounts
                  </Link>
                </div>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
