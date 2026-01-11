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
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-3 mb-4">
            <FaTicketAlt className="text-blue-600" /> Add a New Ticket
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Submit your transport offering details below. All submissions are
            pending Admin approval.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Title / Route Name*
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="e.g., Dhaka - Chittagong AC Deluxe"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1 block">
                  Ticket Title is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transport Type*
              </label>
              <select
                {...register("ticketType", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Transport Type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Launch">Launch</option>
              </select>
              {errors.ticketType && (
                <span className="text-red-500 text-sm mt-1 block">
                  Transport Type is required
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Operator Name*
              </label>
              <input
                type="text"
                {...register("operatorName", { required: true })}
                placeholder="e.g., Green Line, Biman Bangladesh"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.operatorName && (
                <span className="text-red-500 text-sm mt-1 block">
                  Operator Name is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Image*
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept="image/*"
              />
              {errors.image && (
                <span className="text-red-500 text-sm mt-1 block">
                  Ticket Image is required
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure City/Station*
              </label>
              <input
                type="text"
                {...register("from", { required: true })}
                placeholder="e.g., Dhaka"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.from && (
                <span className="text-red-500 text-sm mt-1 block">
                  Departure location is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arrival City/Station*
              </label>
              <input
                type="text"
                {...register("to", { required: true })}
                placeholder="e.g., Chittagong"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.to && (
                <span className="text-red-500 text-sm mt-1 block">
                  Arrival location is required
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Date*
              </label>
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.departureDate && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.departureDate.message || "Departure date is required"}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Time*
              </label>
              <input
                type="time"
                {...register("departureTime", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.departureTime && (
                <span className="text-red-500 text-sm mt-1 block">
                  Departure time is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Arrival Time*
              </label>
              <input
                type="time"
                {...register("arrivalTime", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.arrivalTime && (
                <span className="text-red-500 text-sm mt-1 block">
                  Arrival time is required
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price per Seat (BDT)*
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                placeholder="e.g., 550"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1 block">
                  Valid Price (BDT 1+) is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seats Available*
              </label>
              <input
                type="number"
                {...register("seatsAvailable", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                placeholder="e.g., 40"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.seatsAvailable && (
                <span className="text-red-500 text-sm mt-1 block">
                  Seats Available must be at least 1
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Ticket Perks / Features
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("perks")}
                  value="AC/Climate Control"
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaChair className="text-blue-500" /> AC/Climate Control
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("perks")}
                  value="Onboard WiFi"
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaWifi className="text-blue-500" /> Onboard WiFi
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("perks")}
                  value="Meal/Snacks Provided"
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaUtensils className="text-blue-500" /> Meal/Snacks
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("perks")}
                  value="Reclining Seats"
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaChair className="text-blue-500" /> Reclining Seats
                </span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description / Notes (Optional)
            </label>
            <textarea
              {...register("description")}
              placeholder="e.g., AC Business Class, stops at Feni and Comilla only. Reporting 30 mins prior."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-24 resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg"
            >
              <FaUpload className="text-xl" /> Submit Ticket for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
