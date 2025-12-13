import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth"; // Correctly imported

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // Password watch for showing validation errors dynamically

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // 1. Create User in Firebase
      const result = await createUser(data.email, data.password);
      const user = result.user; // 2. Update Profile with Name and Photo URL (V9 Syntax)
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photoURL || "",
      }); // 3. Save User to MongoDB with role 'user'
      const userData = {
        name: data.name,
        email: data.email,
        photo: data.photoURL || "",
        role: "user",
        status: "active",
      };
      await axiosSecure.post("/users", userData); // 4. Success feedback and navigation

      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to TicketBari!",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      // Handle Firebase specific errors (e.g., auth/email-already-in-use)
      let errorMessage = error.message || "Registration failed!";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please login.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Needs to be 6 characters or more.";
      } else {
        // This catches the generic 400 that Firebase returns for duplicates if the specific code isn't passed correctly
        console.error("Firebase Auth Error:", error);
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user; // Save/Update user in MongoDB

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
        status: "active",
      };
      await axiosSecure.post("/users", userData);

      Swal.fire("Success", "Google Sign-in Successful!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message || "Google Sign-in failed!", "error");
    }
  }; // --- Password Validation Helpers ---

  const isLengthValid = password?.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  return (
    <div className="hero min-h-screen bg-base-200">
           {" "}
      <div className="hero-content flex-col lg:flex-row-reverse">
               {" "}
        <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register Now!</h1>       
           {" "}
          <p className="py-6">
                        Join TicketBari to book your bus, train, launch, and
            flight tickets             easily and securely.          {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                   {" "}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                       {" "}
            <div className="form-control">
                           {" "}
              <label className="label">
                                <span className="label-text">Name</span>       
                     {" "}
              </label>
                           {" "}
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />
                           {" "}
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                                    Name is required                {" "}
                </span>
              )}
                         {" "}
            </div>
                       {" "}
            <div className="form-control">
                           {" "}
              <label className="label">
                                <span className="label-text">Email</span>       
                     {" "}
              </label>
                           {" "}
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
              />
                           {" "}
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                                    Email is required                {" "}
                </span>
              )}
                         {" "}
            </div>
                       {" "}
            <div className="form-control">
                           {" "}
              <label className="label">
                                <span className="label-text">Photo URL</span>   
                         {" "}
              </label>
                           {" "}
              <input
                type="text"
                {...register("photoURL")}
                placeholder="Photo URL (Optional)"
                className="input input-bordered"
              />
                         {" "}
            </div>
                       {" "}
            <div className="form-control">
                           {" "}
              <label className="label">
                                <span className="label-text">Password</span>   
                         {" "}
              </label>
                           {" "}
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6, // Custom validation regex for Upper/Lower case
                  pattern: /(?=.*[A-Z])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
                            {/* Validation Feedback */}             {" "}
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                                    Password is required                {" "}
                </p>
              )}
                           {" "}
              <div className="text-xs mt-2 space-y-1">
                               {" "}
                <p
                  className={isLengthValid ? "text-green-600" : "text-red-500"}
                >
                                    Length must be at least 6 characters        
                         {" "}
                </p>
                               {" "}
                <p className={hasUppercase ? "text-green-600" : "text-red-500"}>
                                    Must have an Uppercase letter              
                   {" "}
                </p>
                               {" "}
                <p className={hasLowercase ? "text-green-600" : "text-red-500"}>
                                    Must have a Lowercase letter                {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="form-control mt-6">
                           {" "}
              <button type="submit" className="btn btn-primary">
                                Register              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </form>
                   {" "}
          <div className="px-8 pb-4 text-center">
                        <p className="mb-2">Or Register with</p>           {" "}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-circle btn-outline"
            >
              {/* SVG for Google Button */}
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
                         {" "}
            </button>
                       {" "}
            <p className="mt-4">
                            Already have an account?              {" "}
              <Link to="/login" className="text-primary font-bold link">
                                Login              {" "}
              </Link>
                         {" "}
            </p>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};
export default Register;
