import React from "react";

export const FormTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="my-4">
      <h1 className="text-base font-medium text-gray-800">{title}</h1>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  );
};
