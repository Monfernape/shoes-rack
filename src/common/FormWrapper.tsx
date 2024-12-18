import React from "react";

type Props = {
  children: React.ReactNode;
};
const FormWrapper = ({ children }: Props) => {
  return (
    <div className="p-8 mx-auto w-full  sm:w-3/4 md:w-2/4 bg-white rounded h-full">
      {children}
    </div>
  );
};

export default FormWrapper;
