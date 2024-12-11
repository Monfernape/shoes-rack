import React from "react";

export const FormTitle = ({ title }: { title: string }) => {
  return (
    <div className="my-4">
      <h1 className="text-base font-medium text-gray-800">{title}</h1>
    </div>
  );
};
