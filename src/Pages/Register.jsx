import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photoURL || "",
      });

      Swal.fire("Success", "Registration successful!", "success");
      navigate("/");
    } catch (error) {
  console.error("Firebase Error:", error.code);

  let message = "Registration failed";

  if (error.code === "auth/email-already-in-use") {
    message = "This email is already registered. Please login.";
  }

  Swal.fire("Error", message, "error");
}
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      Swal.fire("Success", "Google sign-in successful", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "Google sign-in failed", "error");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <input
            className="input input-bordered"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-xs">Name required</p>}

          <input
            className="input input-bordered"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />

          <input
            className="input input-bordered"
            placeholder="Photo URL (optional)"
            {...register("photoURL")}
          />

          <input
            className="input input-bordered"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", { required: true, minLength: 6 })}
          />

          <button className="btn btn-primary mt-4">Register</button>

          <button
            type="button"
            onClick={handleGoogle}
            className="btn btn-outline mt-2"
          >
            Continue with Google
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
