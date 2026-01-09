import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaTicketAlt,
  FaUpload,
  FaWifi,
  FaChair,
  FaUtensils,
} from "react-icons/fa";
import axios from "axios";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_host
}`;

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    let imageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const imgUploadRes = await axios.post(IMAGE_HOSTING_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imgUploadRes.data.success) {
          imageUrl = imgUploadRes.data.data.display_url;
        } else {
          throw new Error(
            imgUploadRes.data.error?.message || "Image upload failed."
          );
        }
      } catch (error) {
        console.error("Image Upload Error:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed!",
          text: "Failed to upload ticket image. Please ensure the file is valid and try again.",
        });
        return;
      }
    }

    const newTicket = {
      vendorEmail: user?.email,
      vendorName: user?.displayName,
      dateAdded: new Date(),
      verificationStatus: "pending",
      isAdvertised: false,
      title: data.title,
      imageUrl: imageUrl,
      perks: data.perks || [],
      departureDate: data.departureDate,
      ticketType: data.ticketType,
      operatorName: data.operatorName,
      from: data.from,
      to: data.to,
      departureTime: data.departureTime,
      arrivalTime: data.arrivalTime,
      price: parseFloat(data.price),
      seatsAvailable: parseInt(data.seatsAvailable),
      description: data.description || "",
    };
    try {
      const response = await axiosSecure.post("/tickets", newTicket);

      if (response.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Ticket Added!",
          text: "Your ticket has been submitted for Admin review.",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to add ticket. Please check your network and data.",
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-3">
        <FaTicketAlt className="text-2xl" /> Add a New Ticket
      </h2>
      <p className="text-center mb-8 text-gray-500">
        Submit your transport offering details below. All submissions are
        pending Admin approval.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="form-label-custom">
              Ticket Title / Route Name*
            </label>

            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="e.g., Dhaka - Chittagong AC Deluxe"
              className="form-input-custom"
            />

            {errors.title && (
              <span className="form-error">Ticket Title is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Transport Type*</label>

            <select
              {...register("ticketType", { required: true })}
              className="form-input-custom"
            >
              <option value="">Select Transport Type</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Launch">Launch</option>
            </select>

            {errors.ticketType && (
              <span className="form-error">Transport Type is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="form-label-custom">Operator Name*</label>

            <input
              type="text"
              {...register("operatorName", { required: true })}
              placeholder="e.g., Green Line, Biman Bangladesh"
              className="form-input-custom"
            />

            {errors.operatorName && (
              <span className="form-error">Operator Name is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Ticket Image*</label>

            <input
              type="file"
              {...register("image", { required: true })}
              className="form-input-custom file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              accept="image/*"
            />

            {errors.image && (
              <span className="form-error">Ticket Image is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="form-label-custom">Departure City/Station*</label>

            <input
              type="text"
              {...register("from", { required: true })}
              placeholder="e.g., Dhaka"
              className="form-input-custom"
            />

            {errors.from && (
              <span className="form-error">Departure location is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Arrival City/Station*</label>

            <input
              type="text"
              {...register("to", { required: true })}
              placeholder="e.g., Chittagong"
              className="form-input-custom"
            />

            {errors.to && (
              <span className="form-error">Arrival location is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="form-control">
            <label className="form-label-custom">Departure Date*</label>

            <input
              type="date"
              {...register("departureDate", {
                required: "Departure date is required",
                min: {
                  value: getTodayDate(),
                  message: "Departure date cannot be in the past.",
                },
              })}
              min={getTodayDate()}
              className="form-input-custom"
            />

            {errors.departureDate && (
              <span className="form-error">
                {errors.departureDate.message || "Departure date is required"}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Departure Time*</label>

            <input
              type="time"
              {...register("departureTime", { required: true })}
              className="form-input-custom"
            />
            {errors.departureTime && (
              <span className="form-error">Departure time is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Estimated Arrival Time*</label>
            <input
              type="time"
              {...register("arrivalTime", { required: true })}
              className="form-input-custom"
            />

            {errors.arrivalTime && (
              <span className="form-error">Arrival time is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="form-control">
            <label className="form-label-custom">Price per Seat (BDT)*</label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              placeholder="e.g., 550"
              className="form-input-custom"
            />

            {errors.price && (
              <span className="form-error">
                Valid Price (BDT 1+) is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="form-label-custom">Seats Available*</label>

            <input
              type="number"
              {...register("seatsAvailable", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              placeholder="e.g., 40"
              className="form-input-custom"
            />

            {errors.seatsAvailable && (
              <span className="form-error">
                Seats Available must be at least 1
              </span>
            )}
          </div>
        </div>

        <div className="form-control mb-6">
          <label className="form-label-custom text-lg">
            Ticket Perks / Features
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-neutral-200 dark:border-neutral-700">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("perks")}
                value="AC/Climate Control"
                className="w-4 h-4 text-primary-600 bg-surface-light dark:bg-surface-dark border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
              />

              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FaChair className="text-primary-500" /> AC/Climate Control
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("perks")}
                value="Onboard WiFi"
                className="w-4 h-4 text-primary-600 bg-surface-light dark:bg-surface-dark border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
              />

              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FaWifi className="text-primary-500" /> Onboard WiFi
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("perks")}
                value="Meal/Snacks Provided"
                className="w-4 h-4 text-primary-600 bg-surface-light dark:bg-surface-dark border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
              />

              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FaUtensils className="text-primary-500" /> Meal/Snacks
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("perks")}
                value="Reclining Seats"
                className="w-4 h-4 text-primary-600 bg-surface-light dark:bg-surface-dark border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
              />

              <span className="label-text flex items-center gap-1">
                Reclining Seats
              </span>
            </label>
          </div>
        </div>

        <div className="form-control mb-8">
          <label className="label">
            <span className="label-text font-semibold">
              Description / Notes (Optional)
            </span>
          </label>

          <textarea
            {...register("description")}
            placeholder="e.g., AC Business Class, stops at Feni and Comilla only. Reporting 30 mins prior."
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary text-white text-lg font-bold"
          >
            <FaUpload /> Submit Ticket for Approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicket;
