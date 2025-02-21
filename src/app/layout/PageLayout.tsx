import React from "react";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex flex-col px-2 md:px-8 py-4">{children}</div>;
};
