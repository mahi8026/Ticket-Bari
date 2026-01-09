import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful! Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed! Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
        status: "active",
      };
      await axiosSecure.post("/users", userData);

      toast.success("Google Sign-in successful! Welcome!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google Sign-in failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Welcome Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <h1 className="heading-1 text-neutral-800 dark:text-neutral-200 mb-6">
            Welcome Back to TicketBari
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            Access your dashboard, manage bookings, and find the best tickets
            for your next journey across Bangladesh.
          </p>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎫
                  </motion.div>
                </div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Easy Booking
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Book tickets in just a few clicks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🚌
                  </motion.div>
                </div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Multiple Routes
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Travel anywhere in Bangladesh
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="card-premium p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  🔐
                </motion.div>
              </div>
              <h2 className="heading-3 text-neutral-800 dark:text-neutral-200 mb-2">
                Sign In
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Welcome back! Please sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="form-label-custom">Email Address</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className={`form-input-custom ${
                    errors.email ? "border-error-500" : ""
                  }`}
                />
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="form-error"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="form-label-custom">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className={`form-input-custom ${
                    errors.password ? "border-error-500" : ""
                  }`}
                />
                {errors.password && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="form-error"
                  >
                    {errors.password.message}
                  </motion.span>
                )}
                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary-custom w-full text-lg py-3"
                >
                  Sign In
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl shadow-soft bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12.0001 4.58801C14.1451 4.58801 15.9901 5.37801 17.3931 6.74201L19.7931 4.34201C17.7551 2.30401 15.0111 1.33401 12.0001 1.33401C7.2711 1.33401 3.2081 4.39701 1.6311 8.87801L4.5421 11.189C5.4511 8.52601 8.4231 6.74201 12.0001 6.74201V4.58801Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.3691 12.0001C23.3691 11.3991 23.3151 10.7931 23.2071 10.2081H12.0001V14.5451H18.7841C18.4911 16.0351 17.6531 17.2911 16.5161 18.1761L19.3301 20.3731C21.4931 18.5771 22.8441 15.7321 23.3691 12.0001Z"
                  fill="#4285F4"
                />
                <path
                  d="M4.5421 17.5811C4.3091 16.8921 4.1871 16.1681 4.1871 15.4171C4.1871 14.6661 4.3091 13.9421 4.5361 13.2531L1.6251 10.9421C1.0491 12.1891 0.7511 13.7381 0.7511 15.4171C0.7511 17.0961 1.0491 18.6451 1.6251 19.8921L4.5421 17.5811Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.0001 23.6661C14.7171 23.6661 17.0781 22.7661 18.8871 21.3251L16.5161 18.1761C15.5291 18.8911 14.0721 19.4971 12.0001 19.4971C8.4231 19.4971 5.4511 17.7131 4.5421 15.0501L1.6311 17.3611C3.2081 21.8421 7.2711 24.9051 12.0001 24.9051L12.0001 23.6661Z"
                  fill="#34A853"
                />
              </svg>
              Sign in with Google
            </motion.button>

            {/* Register Link */}
            <div className="text-center mt-8">
              <p className="text-neutral-600 dark:text-neutral-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
