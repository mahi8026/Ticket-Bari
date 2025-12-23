import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
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
      Swal.fire("Login Successful!", "You are now signed in.", "success");
      navigate(from, { replace: true });
    }
    catch (error) {
      Swal.fire("Error", error.message || "Login failed!", "error");
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

      Swal.fire("Success", "Google Sign-in Successful!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message || "Google Sign-in failed!", "error");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login to TicketBari</h1>
          <p className="py-6">
            Access your dashboard, manage bookings, and find the best tickets
            for your next journey.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  Email is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  Password is required
                </span>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="px-8 pb-4 text-center">
            <p className="mb-2">Or Login with</p>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-circle btn-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </button>
            <p className="mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold link">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
