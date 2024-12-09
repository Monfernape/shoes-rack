import React from "react";

type Props = {
  children: React.ReactNode;
};
const FormWrapper = ({ children }: Props) => {
  return (
    <div className="p-4 mx-auto w-3/4  sm:w-2/4 bg-white rounded h-full">
      {children}
    </div>
  );
};

export default FormWrapper;
