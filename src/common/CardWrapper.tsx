import React, { ReactNode } from "react";

interface CardWrapperProps {
  children: ReactNode;
}

const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="flex justify-center sm:m-8">
      {children}
    </div>
  );
};

export default CardWrapper;
