import React from "react";

// Main Professional Loading Component with Truck Animation
const LoadingSpinner = ({
  size = "large",
  message = "Loading...",
  type = "page",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  // Full page loading with animated truck
  if (type === "page") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          {/* Truck Loading Animation */}
          <div className="truck-loader mb-8">
            <div className="truck-wrapper">
              <div className="truck-body">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 198 93"
                  className="truck-svg"
                >
                  <path
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#3B82F6"
                    d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                  ></path>
                  <path
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#6366F1"
                    d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                  ></path>
                  <path
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#282828"
                    d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                  ></path>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#FEF08A"
                    rx="1"
                    height="7"
                    width="5"
                    y="63"
                    x="187"
                  ></rect>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#282828"
                    rx="1"
                    height="11"
                    width="4"
                    y="81"
                    x="193"
                  ></rect>
                  <rect
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#E5E7EB"
                    rx="2.5"
                    height="90"
                    width="121"
                    y="1.5"
                    x="6.5"
                  ></rect>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#E5E7EB"
                    rx="2"
                    height="4"
                    width="6"
                    y="84"
                    x="1"
                  ></rect>
                </svg>
              </div>
              <div className="truck-tires">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 30"
                  className="tire-svg"
                >
                  <circle
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#282828"
                    r="13.5"
                    cy="15"
                    cx="15"
                  ></circle>
                  <circle fill="#E5E7EB" r="7" cy="15" cx="15"></circle>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 30"
                  className="tire-svg"
                >
                  <circle
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#282828"
                    r="13.5"
                    cy="15"
                    cx="15"
                  ></circle>
                  <circle fill="#E5E7EB" r="7" cy="15" cx="15"></circle>
                </svg>
              </div>
              <div className="road"></div>
              <svg
                xmlSpace="preserve"
                viewBox="0 0 453.459 453.459"
                xmlns="http://www.w3.org/2000/svg"
                fill="#6366F1"
                className="lamp-post"
              >
                <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"></path>
              </svg>
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
              {message}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your journey is being prepared...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Inline loading - simple spinner
  if (type === "inline") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative">
          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-5 h-5 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        {message && (
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </span>
        )}
      </div>
    );
  }

  // Section loading - mini truck
  if (type === "section") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 ${className}`}
      >
        <div className="mini-truck-loader mb-4">
          <div className="mini-truck-wrapper">
            <div className="mini-truck-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 198 93"
                className="mini-truck-svg"
              >
                <path
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#3B82F6"
                  d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                ></path>
                <rect
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#E5E7EB"
                  rx="2.5"
                  height="90"
                  width="121"
                  y="1.5"
                  x="6.5"
                ></rect>
              </svg>
            </div>
            <div className="mini-road"></div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {message}
        </p>
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div
          className={`border-2 border-gray-300 dark:border-gray-600 rounded-full animate-spin ${sizeClasses[size]}`}
        >
          <div
            className={`absolute top-0 left-0 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin ${sizeClasses[size]}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Card Skeleton with simple design
export const CardSkeleton = ({ count = 1, type = "default" }) => {
  if (type === "ticket") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-1">
                  <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded w-16 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                </div>
                <div className="h-8 bg-blue-200 dark:bg-blue-800 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="contents">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-blue-200 dark:bg-blue-800 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b border-gray-200 dark:border-gray-600">
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-4 text-left">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Search Skeleton
export const SearchSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-24 h-12 bg-blue-200 dark:bg-blue-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Loading Button
export const LoadingButton = ({
  loading = false,
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 ${className} ${
        loading || disabled
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-md transform hover:-translate-y-0.5"
      }`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="relative mr-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingSpinner;
