import React from "react";

export const FormTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-base font-medium text-gray-800 my-4">{title}</h1>
  );
};
