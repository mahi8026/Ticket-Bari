
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-base-100">
      <span className="loading loading-ring loading-lg text-primary"></span>
      <p className="text-lg font-semibold text-primary ml-4">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
