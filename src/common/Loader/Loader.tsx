import React from "react";

export const DataSpinner = ({
  isSmallScreen = false,
  isMemberSelector = false,
}) => {
  return (
    <div
      className={`${
        isMemberSelector
          ? "w-full h-8 bg-loader flex items-center"
          : "w-full h-full bg-loader fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      }`}
    >
      <div
        className={`${
          isSmallScreen ? "w-4 h-4 border-2" : "w-16 h-16 border-4"
        } border-gray-200 border-t-gray-400 border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
};
