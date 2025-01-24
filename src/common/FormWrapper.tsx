import React from "react";

type Props = {
  children: React.ReactNode;
};
const FormWrapper = ({ children }: Props) => {
  return (
    <div className=" px-2 md:p-8 mx-auto w-full  sm:w-3/4 lg:w-8/12 xl:w-7/12 bg-white rounded h-full">
      {children}
    </div>
  );
};

export default FormWrapper;
