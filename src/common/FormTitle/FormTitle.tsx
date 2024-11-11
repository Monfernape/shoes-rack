import React from "react";

export const FormTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-sm text-sm font-semibold text-gray-800 my-4">
      {title}
    </h1>
  );
};
